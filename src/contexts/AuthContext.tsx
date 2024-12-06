// app/contexts/AuthContext.tsx
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
import routes from "../routes";
import apiClient from "../services/axiosClient";

enum Role {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  id: string;
  patientId: string;
  name: string;
  email: string;
  role: Role;
  document: string | null;
  birthDate: string | null;
  isActive: boolean;
}

interface LoginOutput {
  success: boolean;
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
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  const [executeFetchUser, fetchUserState] = useLazyAxios<User>();
  const [executeSignIn, signInState] = useLazyAxios<LoginOutput>();
  const [executeSignOut, signOutState] = useLazyAxios();

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

  const fetchUser = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      const response = await executeFetchUser({
        url: "/me",
        method: "GET",
      });
      if (response && response.data) {
        setUser(response.data);
        setStoredSub(response.data.id);
        setStoredRole(response.data.role);
        setStoredName(response.data.name);
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      setUser(null);
      setStoredSub("");
      setStoredRole(Role.USER);
      setStoredName("");
    } finally {
      setIsLoadingUser(false);
    }
  }, [executeFetchUser, setStoredSub, setStoredRole, setStoredName]);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setIsLoadingUser(true);
      try {
        const response = await executeSignIn({
          url: "/login",
          method: "POST",
          data: { email, password },
        });

        if (response && response.data.success) {
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

          setStoredSub(sub);
          setStoredRole(role);
          setStoredName(name);

          apiClient.defaults.headers.Authorization = `${token_type} ${access_token}`;
          await fetchUser();
          router.push(routes.home.path);
        } else {
          throw new Error("Login falhou");
        }
      } catch (err) {
        console.error("Erro ao fazer login", err);
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
      router,
      setStoredSub,
      setStoredRole,
      setStoredName,
      fetchUser,
    ]
  );

  const signOut = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      await executeSignOut({
        url: "/logout",
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
        await fetchUser();
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
  }, [fetchUser, storedSub, storedRole, storedName]);

  return (
    <AuthContext.Provider
      value={{ user, isLoadingUser, signIn, signOut, fetchUser }}
    >
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
