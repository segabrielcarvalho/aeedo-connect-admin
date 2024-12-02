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

enum Role {
  ADMIN = "admin",
  USER = "user",
}

type User = {
  id: number;
  name: string;
  email: string;
  role?: Role;
};

type AuthProviderProps = { children: ReactNode };

type AuthContextData = {
  user?: User | null;
  isLoadingUser: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
  fetchUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const router = useRouter();

  // const { refetch: fetchUserRequest ,} = useAxios<User>({
  //   url: "/api/user",
  //   method: "GET",
  // });

  // const [executeSignIn] = useLazyAxios();
  // const [executeSignOut] = useLazyAxios();

  const fetchUser = useCallback(async () => {
    setIsLoadingUser(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1));

      setUser({
        id: 1,
        name: "User Name",
        email: "user@user.com",
        role: Role.USER,
      });
    } catch {
      setUser(null);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const signIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1));

        if (email === "user@user.com" && password === "12345678") {
          setUser({
            id: 1,
            name: "User Name",
            email: "user@user.com",
            role: Role.USER,
          });
          router.push("/");
        } else {
          throw new Error("Credenciais inválidas");
        }
      } catch (err) {
        console.error("Erro ao fazer login", err);
        setUser(null);
      }
    },
    [router]
  );

  const signOut = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1));
    setUser(null);
    nookies.destroy(null, "XSRF-TOKEN");
    router.push("/login");
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
