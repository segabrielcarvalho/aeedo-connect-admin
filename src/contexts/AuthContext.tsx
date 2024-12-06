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
  useState,
} from "react";
import { useAxios } from "../hooks/useAxios";
import { useLazyAxios } from "../hooks/useLazyAxios";
import useLocalStorageState from "../hooks/useLocalStorageState";
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

  const { refetch: fetchUserRequest } = useAxios<User>({
    url: "/me",
    method: "GET",
  });

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

  const fetchUser = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      const { data } = await fetchUserRequest();
      setUser(data);
      setStoredSub(data.id);
      setStoredRole(data.role);
      setStoredName(data.name);
    } catch (error) {
      console.error("Erro ao buscar o usuário:", error);
      setUser(null);
      setStoredSub("");
      setStoredRole(Role.USER);
      setStoredName("");
    } finally {
      setIsLoadingUser(false);
    }
  }, [fetchUserRequest, setStoredSub, setStoredRole, setStoredName]);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await executeSignIn({
          url: "/login",
          method: "POST",
          data: { email, password },
        });

        if (response?.data) {
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

          await fetchUser();

          router.push("/");
        } else {
          throw new Error("Login falhou");
        }
      } catch (err) {
        console.error("Erro ao fazer login:", err);
        setUser(null);
        setStoredSub("");
        setStoredRole(Role.USER);
        setStoredName("");
        throw err;
      }
    },
    [
      executeSignIn,
      router,
      fetchUser,
      setStoredSub,
      setStoredRole,
      setStoredName,
    ]
  );

  const signOut = useCallback(async () => {
    try {
      await executeSignOut({
        url: "/logout",
        method: "POST",
      });
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    } finally {
      nookies.destroy(null, "access_token");
      nookies.destroy(null, "token_type");

      setStoredSub("");
      setStoredRole(Role.USER);
      setStoredName("");

      setUser(null);

      router.push("/login");
    }
  }, [executeSignOut, router, setStoredSub, setStoredRole, setStoredName]);

  useEffect(() => {
    const initializeAuth = async () => {
      const cookies = nookies.get(null);
      const token = cookies.access_token;
      const tokenType = cookies.token_type;

      if (token && tokenType) {
        apiClient.defaults.headers.Authorization = `${tokenType} ${token}`;
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
        } else {
          setUser(null);
        }

        setIsLoadingUser(false);
      }
    };

    initializeAuth();
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
