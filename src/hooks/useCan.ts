import { useAuthContext } from "@/contexts/AuthContext";
import { validateUserPermissions } from "./validateUserPermissions";

type UseCamParams = {
  permissions?: string[];
  roles?: string[];
};
export function useCan({ roles }: UseCamParams) {
  const { user } = useAuthContext();

  if (!user) return false;

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles,
  });

  return userHasValidPermissions;
}
