"use client";

import Button from "@/components/Button";
import Can from "@/components/Can";
import SectionHeading from "@/components/SectionHeading";
import { RoleEnum, useAuthContext } from "@/contexts/AuthContext";
import routes from "@/routes";
import OrgansTable from "./components/OrgansTable";
import { OrgansUsersTable } from "./components/OrgansUsersTable";

export const Organs = () => {
  const { user } = useAuthContext();

  return (
    <div className="mx-auto lg:flex lg:gap-x-16 lg:px-8">
      <main className="px-4 py-10 sm:px-6 lg:flex-auto lg:px-0 ">
        <div className="mx-auto space-y-8 lg:mx-0 lg:max-w-none">
          <SectionHeading
            title="Órgãos"
            description="Gerencie os órgãos da plataforma"
          >
            <Can roles={[RoleEnum.ADMIN]}>
              <Button
                href={routes.dashboard.organs.create.path}
                variant="solid"
                color="secondary"
              >
                Adicionar Órgão
              </Button>
            </Can>
          </SectionHeading>

          {user?.role === RoleEnum.USER ? (
            <OrgansUsersTable />
          ) : (
            <OrgansTable />
          )}
        </div>
      </main>
    </div>
  );
};
