"use client";

import EmptyState from "@/components/EmptyState";
import Table from "@/components/Table";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { LiaUserSlashSolid } from "react-icons/lia";
import { adminColumns, generalColumns } from "../constants";
import { useUsersContext } from "../context/UsersContext";

export const UsersTable = () => {
  const {
    axios: {
      usersQuery: { data },
    },
    get: { filterUserType },
  } = useUsersContext();
  const router = useRouter();

  const columns = useMemo(() => {
    if (!data || data.length === 0) return [];

    if (filterUserType === "donor" || filterUserType === "recipient") {
      return generalColumns;
    }

    if (filterUserType === "admin" || !filterUserType) {
      return adminColumns;
    }

    return [];
  }, [data, filterUserType]);

  if (data?.length === 0) {
    return (
      <EmptyState
        title="Nenhum usuário disponível"
        description="Não há registros de usuários correspondentes à sua busca. Tente ajustar os filtros ou realizar outra pesquisa."
        icon={<LiaUserSlashSolid className="h-12 w-12 text-gray-400" />}
      />
    );
  }

  return (
    <Table
      onAction={(user) => {
        router.push(
          routes.dashboard.users.show.path.replace(
            "[userId]",
            user.id.toString()
          )
        );
      }}
      data={data || []}
      columns={columns}
    />
  );
};
