"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { RoleEnum, useAuthContext } from "../../contexts/AuthContext";
import routes from "../../routes";

const DashboardPage = () => {
  const { user } = useAuthContext();
  const router = useRouter();
  const role = user?.role;

  useEffect(() => {
    if (role === RoleEnum.ADMIN) {
      router.push(routes.dashboard.users.path);
    } else if (role === RoleEnum.USER) {
      router.push(routes.dashboard.me.path);
    }
  }, [role, router]);

  return null;
};

export default DashboardPage;
