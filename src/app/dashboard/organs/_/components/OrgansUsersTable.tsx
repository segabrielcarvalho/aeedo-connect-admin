"use client";

import EmptyState from "@/components/EmptyState";
import SelectableButton from "@/components/SelectableButton";
import { useAuthContext } from "@/contexts/AuthContext";
import { getOrganIcon } from "@/utils/getOrganIcon";
import { GiHeartOrgan } from "react-icons/gi";
import { useOrgansContext } from "../context/OrgansContext";

export const OrgansUsersTable = () => {
  const { user } = useAuthContext();
  const { organsPatientData } = useOrgansContext();

  if (!organsPatientData || organsPatientData.length === 0) {
    return (
      <EmptyState
        title="Órgãos do Paciente"
        description="Nenhum órgão encontrado."
        icon={<GiHeartOrgan className="w-12 h-12 text-gray-300" />}
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-3 2xl:grid-cols-7 gap-4">
      {organsPatientData.map((organ) => {
        const organIcon = getOrganIcon(organ.slug);

        return (
          <SelectableButton
            key={organ.slug}
            isSelected={false}
            label={organ.name}
            onClick={() => {}}
            icon={organIcon}
          />
        );
      })}
    </div>
  );
};
