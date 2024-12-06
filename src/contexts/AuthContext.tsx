"use client";

import { useRouter } from "next/navigation";
import nookies from "nookies";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLazyAxios } from "../hooks/useLazyAxios";
import useLocalStorageState from "../hooks/useLocalStorageState";
import useToastHook from "../hooks/useToastHook";
import routes from "../routes";
import apiRoutes from "../routes/api";
import apiClient from "../services/axiosClient";

enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id?: string;
  patientId?: string;
  name?: string;
  email?: string;
  role?: Role;
  document?: string | null;
  birthDate?: string | null;
  isActive?: boolean;
}

interface LoginOutput {
  success: boolean;
  message?: string;
  data: {
    token_type: string;
    access_token: string;
    sub: string;
    name: string;
    role: Role;
  };
}

type AuthProviderProps = { children: ReactNode };

type AuthContextData = {
  user: User | null;
  isLoadingUser: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const { success, error } = useToastHook();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  const [executeFetchUser, { data: userData }] = useLazyAxios<User>();
  const [executeSignIn] = useLazyAxios<LoginOutput>();
  const [executeSignOut] = useLazyAxios();

  const [storedSub, setStoredSub] = useLocalStorageState<string>({
    key: "auth-sub",
    initialValue: "",
    saveToLocalStorage: true,
  });

  const [storedRole, setStoredRole] = useLocalStorageState<Role>({
    key: "auth-role",
    initialValue: Role.USER,
    saveToLocalStorage: true,
  });

  const [storedName, setStoredName] = useLocalStorageState<string>({
    key: "auth-name",
    initialValue: "",
    saveToLocalStorage: true,
  });

  const isInitialized = useRef(false);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoadingUser(true);
      try {
        const response = await executeSignIn({
          url: apiRoutes.auth.login.path,
          method: "POST",
          data: { email, password },
        });

        if (response?.data?.success) {
          const { token_type, access_token, sub, role, name } =
            response.data.data;

          nookies.set(null, "access_token", access_token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          nookies.set(null, "token_type", token_type, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });

          apiClient.defaults.headers.Authorization = `${token_type} ${access_token}`;
          const userResponse = await executeFetchUser({
            url: apiRoutes.auth.me.path,
            method: "GET",
          });

          if (userResponse?.data) {
            setUser({
              id: sub,
              patientId: userData?.patientId,
              name: userData?.name,
              email: userData?.email,
              role: userData?.role,
              document: userData?.document,
              birthDate: userData?.birthDate,
              isActive: userData?.isActive,
            });

            setStoredSub(sub);
            setStoredRole(role);
            setStoredName(name);
          }

          success({ message: "Login efetuado com sucesso!" });
          router.push(routes.home.path);
        }
      } catch (err: any) {
        console.error("Erro ao fazer login", err);
        const errorMessage =
          err?.response?.data?.message || "Erro ao fazer login";
        error({ message: errorMessage });

        setUser(null);
        setStoredSub("");
        setStoredRole(Role.USER);
        setStoredName("");
      } finally {
        setIsLoadingUser(false);
      }
    },
    [
      executeSignIn,
      executeFetchUser,
      router,
      setStoredSub,
      setStoredRole,
      setStoredName,
      success,
      error,
    ]
  );

  const signOut = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      await executeSignOut({
        url: apiRoutes.auth.logout.path,
        method: "POST",
      });
    } catch (err) {
      console.error("Erro ao fazer logout", err);
    } finally {
      nookies.destroy(null, "access_token");
      nookies.destroy(null, "token_type");

      setStoredSub("");
      setStoredRole(Role.USER);
      setStoredName("");

      setUser(null);

      router.push(routes.auth.login.path);
      setIsLoadingUser(false);
    }
  }, [executeSignOut, router, setStoredSub, setStoredRole, setStoredName]);

  useEffect(() => {
    const initializeAuth = async () => {
      const cookies = nookies.get(null);
      const token = cookies.access_token;

      if (token) {
        apiClient.defaults.headers.Authorization = `${cookies.token_type} ${token}`;
        try {
          const userResponse = await executeFetchUser({
            url: apiRoutes.auth.me.path,
            method: "GET",
          });

          if (userResponse?.data) {
            setUser({
              id: userData?.id,
              patientId: userData?.patientId,
              name: userData?.name,
              email: userData?.email,
              role: userData?.role,
              document: userData?.document,
              birthDate: userData?.birthDate,
              isActive: userData?.isActive,
            });

            setStoredSub(userData?.id || "");
            setStoredRole(userData?.role || Role.USER);
            setStoredName(userData?.name || "");
          }
        } catch (err) {
          console.error("Erro ao buscar usuário:", err);
          setUser(null);
          setStoredSub("");
          setStoredRole(Role.USER);
          setStoredName("");
        } finally {
          setIsLoadingUser(false);
        }
      } else {
        const sub = storedSub;
        const role = storedRole;
        const name = storedName;

        if (sub && role && name) {
          setUser({
            id: sub,
            patientId: "",
            name,
            email: "",
            role,
            document: null,
            birthDate: null,
            isActive: true,
          });
        }

        setIsLoadingUser(false);
      }
    };

    if (!isInitialized.current) {
      isInitialized.current = true;
      initializeAuth();
    }
  }, [executeFetchUser, storedSub, storedRole, storedName]);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de um AuthProvider");
  }
  return context;
}
