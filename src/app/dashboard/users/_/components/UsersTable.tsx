"use client";

import Table from "@/components/Table";
import UserProfile from "@/components/UserInfo";
import { useAxios } from "@/hooks/useAxios";
import routes from "@/routes";
import apiRoutes from "@/routes/api";
import getRoles from "@/utils/getRole";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import "moment/locale/pt-br";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { User } from "../dto";
moment.locale("pt-br");

export const UsersTable = () => {
  const router = useRouter();

  const { data } = useAxios<User[]>({
    url: apiRoutes.users.list.path,
    method: apiRoutes.users.list.method,
  });

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    const firstUser = data[0];

    if (firstUser.role === "admin") {
      return [
        {
          header: "Usuário",
          render: (user: User) => (
            <UserProfile
              name={user.name}
              email={user.email}
              avatarUrl={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name}`}
            />
          ),
          alwaysVisible: true,
        },
        {
          header: "Tipo",
          render: (user: User) => (
            <span className="text-gray-600 text-sm font-light">
              {getRoles(user.role)}
            </span>
          ),
        },

        {
          header: "Criado em",
          render: (user: User) => (
            <div className="flex flex-col">
              <span className="text-gray-600 text-sm font-light">
                {moment(user.createdAt).format("DD/MM/YYYY")}
              </span>
              <span className="text-gray-600 text-sm font-light">
                {moment(user.createdAt).fromNow()}
              </span>
            </div>
          ),
        },
      ];
    } else {
      return [
        {
          header: "Usuário",
          render: (user: User) => (
            <UserProfile
              name={user.name}
              email={user.email}
              avatarUrl={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name}`}
            />
          ),
          alwaysVisible: true,
        },
        {
          header: "Tipo",
          render: (user: User) => (
            <span className="text-gray-600 text-sm font-light">
              {user.role}
            </span>
          ),
        },
        {
          header: "Documento",
          render: (user: User) => (
            <span className="text-gray-600 text-sm font-light">
              {user.document || "-"}
            </span>
          ),
        },
        {
          header: "Nascimento",
          render: (user: User) => (
            <span className="text-gray-600 text-sm font-light">
              {user.birthDate || "-"}
            </span>
          ),
        },
        {
          header: "Ativo",
          render: (user: User) => (
            <span>
              {user.isActive ? (
                <CheckCircleIcon
                  aria-hidden="true"
                  className="text-green-500 h-6 w-6"
                />
              ) : (
                <XMarkIcon
                  className="text-red-500 h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </span>
          ),
        },
      ];
    }
  }, [data]);

  return (
    <Table
      onAction={(user) => {
        router.push(
          routes.dashboard.users.show.path.replace(
            "[userId]",
            user.email.toString()
          )
        );
      }}
      data={data || []}
      columns={columns}
    />
  );
};
