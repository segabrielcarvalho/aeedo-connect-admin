"use client";

import SelectableButton from "@/components/SelectableButton";
import { GiHeartOrgan } from "react-icons/gi";
import EmptyState from "../../../../../components/EmptyState";
import { useAxios } from "../../../../../hooks/useAxios";
import apiRoutes from "../../../../../routes/api";
import { getOrganIcon } from "../../../../../utils/getOrganIcon";
import { OrganResponse } from "../dto";

const OrgansTable = () => {
  const { data } = useAxios<OrganResponse[]>({
    url: apiRoutes.organs.allocate.path,
    method: apiRoutes.organs.allocate.method,
  });

  if (data?.length === 0) {
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
      <div className="grid sm:grid-cols-3 2xl:grid-cols-7 gap-4">
        {data?.map((organ) => {
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
    </div>
  );
};

export default OrgansTable;
