"use client";

import Button from "@/components/Button";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import SectionHeading from "../../../../../components/SectionHeading";
import SelectableButton from "../../../../../components/SelectableButton";
import { organIcons } from "../../../users/create/page";

interface OrganSectionProps {
  userOrgans: string[];
}

const OrgaosTable: React.FC<OrganSectionProps> = ({ userOrgans }) => {

  const organsList = Object.keys(organIcons);

  const [selectedOrgans, setSelectedOrgans] = useState<string[]>(userOrgans);

  const router = useRouter();

  const toggleOrganSelection = (organ: string) => {
    setSelectedOrgans((prev) =>
      prev.includes(organ) ? prev.filter((o) => o !== organ) : [...prev, organ]
    );
  };

  return (
    <div>
      <form className="space-y-12 w-full">
        <SectionHeading title="Órgãos Associados" />
        <div className="grid sm:grid-cols-3 2xl:grid-cols-7 gap-4">
          {organsList.map((organ) => (
            <SelectableButton
              key={organ}
              isSelected={selectedOrgans.includes(organ)}
              label={organ}
              onClick={() => toggleOrganSelection(organ)}
              icon={organIcons[organ as keyof typeof organIcons]}
            />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-3">
          <Button
            variant="outline"
            color="primary"
            type="button"
            className="rounded-md px-5"
            onClick={() => router.push(routes.dashboard.users.path)}
          >
            Cancelar
          </Button>
          <Button
            variant="solid"
            color="secondary"
            className="rounded-md px-12"
            type="submit"
          >
            Criar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrgaosTable;
