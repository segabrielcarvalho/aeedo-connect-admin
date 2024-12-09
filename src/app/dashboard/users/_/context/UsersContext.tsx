"use client";
import { DebouncedFunc } from "@/dto/global";
import { useAxios } from "@/hooks/useAxios";
import useUrlFilter from "@/hooks/useUrlFilter";
import apiRoutes from "@/routes/api";
import { createContext, ReactNode, useContext } from "react";
import { User } from "../dto";

type UsersProviderProps = { children: ReactNode };
type ContextType = {
  get: { filterUserType: "donor" | "recipient" | "admin" | null | undefined };
  set: {
    setFilterUserType: DebouncedFunc<
      (value: "donor" | "recipient" | "admin" | null | undefined) => void
    >;
  };
  axios: {
    usersQuery: ReturnType<typeof useAxios<User[]>>;
  };
};

export type FilterObject = {
  value: string;
  filterId: string;
};

const UsersContext = createContext<ContextType | undefined>(undefined);

export function UsersContextProvider({ children }: UsersProviderProps) {
  const [filterUserType, setFilterUserType] = useUrlFilter<
    "donor" | "recipient" | "admin" | null
  >({ name: "type" });

  const usersQuery = useAxios<User[]>({
    url: apiRoutes.users.list.path,
    method: apiRoutes.users.list.method,
    params: filterUserType ? { type: filterUserType } : {},
  });

  const value: ContextType = {
    get: {
      filterUserType,
    },
    set: {
      setFilterUserType,
    },
    axios: {
      usersQuery,
    },
  };

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

export const useUsersContext = () => {
  const context = useContext(UsersContext);

  if (context === undefined) {
    throw new Error(
      "useUsersContext must be used within a UsersContextProvider"
    );
  }

  return context;
};
