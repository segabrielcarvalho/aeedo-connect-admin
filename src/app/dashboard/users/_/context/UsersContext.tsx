"use client";
import { DebouncedFunc } from "@/dto/global";
import useUrlFilter from "@/hooks/useUrlFilter";
import { createContext, ReactNode, useContext } from "react";
import { User } from "../dto";

type UsersProviderProps = { children: ReactNode };
type ContextType = {
  get: {
    users: User[];
    filterUserType: "donor" | "recipient" | null;
  };
  set: {
    setFilterUserType: DebouncedFunc<
      (value: "donor" | "recipient" | null | undefined) => void
    >;
  };
};

export type FilterObject = {
  value: string;
  filterId: string;
};

const UsersContext = createContext<ContextType | undefined>(undefined);
export function UsersContextProvider({ children }: UsersProviderProps) {
  const [filterUserType, setFilterUserType] = useUrlFilter<
    "donor" | "recipient"
  >({ name: "user_type" });

  const value: ContextType = {
    get: {
      users: [],
      filterUserType,
    },
    set: {
      setFilterUserType,
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
