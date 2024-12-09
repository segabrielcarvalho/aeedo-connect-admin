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
import { useAxios } from "../hooks/useAxios";
import { useLazyAxios } from "../hooks/useLazyAxios";
import useLocalStorageState from "../hooks/useLocalStorageState";
import useToastHook from "../hooks/useToastHook";
import routes from "../routes";
import apiRoutes from "../routes/api";
import apiClient from "../services/axiosClient";

export enum RolePatientEnum {
  DONOR = "donor",
  RECIPIENT = "recipient",
}

export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id?: string;
  patientId?: string;
  name?: string;
  email?: string;
  role?: RoleEnum;
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
    role: RoleEnum;
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

  const [executeSignIn] = useLazyAxios<LoginOutput>();
  const [executeSignOut] = useLazyAxios();

  const [storedSub, setStoredSub] = useLocalStorageState<string | null>({
    key: "auth-sub",
    initialValue: "",
    saveToLocalStorage: true,
  });

  const [storedRole, setStoredRole] = useLocalStorageState<RoleEnum | null>({
    key: "auth-role",
    initialValue: RoleEnum.USER,
    saveToLocalStorage: true,
  });

  const [storedName, setStoredName] = useLocalStorageState<string | null>({
    key: "auth-name",
    initialValue: "",
    saveToLocalStorage: true,
  });

  const isInitialized = useRef(false);

  const cookies = nookies.get(null);
  const token = cookies.access_token;

  const {
    data: userData,
    error: userError,
    isLoading: userDataLoading,
  } = useAxios<User>({
    url: apiRoutes.auth.me.path,
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

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
          const { token_type, access_token, role } = response.data.data;

          nookies.set(null, "access_token", access_token, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          nookies.set(null, "token_type", token_type, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });

          nookies.set(null, "role", role, {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });

          apiClient.defaults.headers.Authorization = `${token_type} ${access_token}`;

          success({ message: "Login efetuado com sucesso!" });

          setIsLoadingUser(false);

          router.replace(routes.home.path);
        }
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || "Erro ao fazer login";
        error({ message: errorMessage });

        setUser(null);
        setStoredSub("");
        setStoredRole(RoleEnum.USER);
        setStoredName("");

        setIsLoadingUser(false);
      }
    },
    [
      executeSignIn,
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
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    } finally {
      nookies.destroy(null, "access_token", { path: "/" });
      nookies.destroy(null, "token_type", { path: "/" });

      localStorage.removeItem("auth-sub");
      localStorage.removeItem("auth-role");
      localStorage.removeItem("auth-name");

      delete apiClient.defaults.headers.Authorization;

      setUser(null);
      setStoredSub(null);
      setStoredRole(null);
      setStoredName(null);

      router.replace(routes.auth.login.path);
      setIsLoadingUser(false);
    }
  }, [executeSignOut, router, setStoredSub, setStoredRole, setStoredName]);

  useEffect(() => {
    if (token) {
      if (!userDataLoading) {
        if (userData) {
          setUser({
            id: userData.id,
            patientId: userData.patientId,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            document: userData.document,
            birthDate: userData.birthDate,
            isActive: userData.isActive,
          });

          setStoredSub(userData.id || "");
          setStoredRole(userData.role || RoleEnum.USER);
          setStoredName(userData.name || "");
        } else if (userError) {
          setUser(null);
          setStoredSub("");
          setStoredRole(RoleEnum.USER);
          setStoredName("");
        }
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
  }, [
    userData,
    userError,
    userDataLoading,
    storedSub,
    storedRole,
    storedName,
    token,
    setStoredName,
    setStoredRole,
    setStoredSub,
  ]);

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
    }
  }, []);

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
