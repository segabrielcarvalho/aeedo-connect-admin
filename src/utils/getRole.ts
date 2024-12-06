import { RoleEnum } from "../contexts/AuthContext";

const roles: { [keys: string]: string } = {
  [RoleEnum.ADMIN]: "Admin",
  [RoleEnum.USER]: "Usuário comum",
};

const getRoles = (key?: string | null) => {
  if (!key) return "-";
  const label = roles[key] || key;
  return label;
};

export default getRoles;
