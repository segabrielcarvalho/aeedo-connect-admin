"use client";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import routes from "@/routes";
import { UsersTable } from "./components/UsersTable";
import { UsersTableFilterButton } from "./components/UsersTableFilterButton";

export const Users = () => {
  return (
    <>
      <SectionHeading
        title="Usuários"
        description="Gerencie os usuários da plataforma"
      >
        <UsersTableFilterButton />
        <Button
          href={routes.dashboard.users.create.path}
          color="secondary"
          variant="solid"
        >
          Criar usuário
        </Button>
      </SectionHeading>

      <UsersTable />
    </>
  );
};
