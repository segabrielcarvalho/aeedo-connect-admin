import { RoleEnum } from "@/contexts/AuthContext";
import { useCan } from "@/hooks/useCan";
import { ReactNode } from "react";

interface ICanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: RoleEnum[];
}

const Can = ({ children, permissions, roles }: ICanProps) => {
  const can = useCan({ permissions, roles });

  if (can) return <>{children}</>;

  return null;
};

export default Can;
