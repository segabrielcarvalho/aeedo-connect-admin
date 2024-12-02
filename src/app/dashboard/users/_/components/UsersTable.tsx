"use client";

import Table from "@/components/Table";
import UserProfile from "@/components/UserInfo";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import routes from "../../../../../routes";

export const UsersTable = () => {
  const router = useRouter();

  return (
    <Table
      onAction={(data) => {
        router.push(
          routes.dashboard.users.show.path.replace(
            "[userId]",
            data.id.toString()
          )
        );
      }}
      data={Array.from({ length: 5 }).map((_, index) => ({
        id: index,
        name: "John Doe",
        email: "user@user.com",
        type: index % 2 === 0 ? "Doador" : "Receptor",
        document: "123.456.789-00",
        birthdate: "01/01/2000",
        role: "Admin",
        isActive: index % 2 === 0,
      }))}
      columns={[
        {
          header: "Usuário",
          render: (data) => (
            <UserProfile
              name={data.name}
              email={data.email}
              avatarUrl="https://images.unsplash.com/photo-1732919258508-3fd53a8007b6?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          ),
          alwaysVisible: true,
        },
        {
          header: "Tipo",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.type}
            </span>
          ),
        },
        {
          header: "Perfil",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.role}
            </span>
          ),
        },
        {
          header: "Documento",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.document}
            </span>
          ),
        },
        {
          header: "Nascimento",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.birthdate}
            </span>
          ),
        },
        {
          header: "Ativo",
          render: (data) => (
            <span>
              {data.isActive ? (
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
      ]}
    />
  );
};
