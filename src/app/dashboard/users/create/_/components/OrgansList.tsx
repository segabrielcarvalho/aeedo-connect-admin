"use client";

import EmptyState from "@/components/EmptyState";
import SectionHeading from "@/components/SectionHeading";
import SelectableButton from "@/components/SelectableButton";
import { useAxios } from "@/hooks/useAxios";
import apiRoutes from "@/routes/api";
import { getOrganIcon } from "@/utils/getOrganIcon";
import { GiHeartOrgan } from "react-icons/gi";
import { OrganResponse, OrgansListProps } from "../dto";

const OrgansList = ({ setValue, selectedOrgans }: OrgansListProps) => {
  const { data } = useAxios<OrganResponse[]>({
    url: apiRoutes.organs.allocate.path,
    method: apiRoutes.organs.allocate.method,
  });

  const isOrganSelected = (organId: string) => {
    return selectedOrgans.some((organ) => organ.id === organId);
  };

  const toggleOrganSelection = (organId: string) => {
    const updatedOrgans = isOrganSelected(organId)
      ? selectedOrgans.filter((organ) => organ.id !== organId)
      : [...selectedOrgans, { id: organId }];

    setValue("organs", updatedOrgans);
  };

  if (!data || data.length === 0) {
    return (
      <EmptyState
        title="Órgãos do Paciente"
        description="Nenhum órgão encontrado."
        icon={<GiHeartOrgan className="w-12 h-12 text-gray-300" />}
      />
    );
  }

  return (
    <div>
      <SectionHeading
        title="Seleção de Órgãos"
        description="Escolha os órgãos associados ao paciente."
      />
      <div className="grid sm:grid-cols-3 2xl:grid-cols-7 gap-4">
        {data.map((organ) => {
          const organIcon = getOrganIcon(organ.slug);

          return (
            <SelectableButton
              key={organ.slug}
              isSelected={isOrganSelected(organ.id)}
              label={organ.name}
              onClick={() => toggleOrganSelection(organ.id)}
              icon={organIcon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrgansList;
