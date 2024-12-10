"use client";

import EmptyState from "@/components/EmptyState";
import SelectableButton from "@/components/SelectableButton";
import { getOrganIcon } from "@/utils/getOrganIcon";
import { useState } from "react";
import { GiHeartOrgan } from "react-icons/gi";
import { useOrgansContext } from "../context/OrgansContext";
import { UpdateOrgan } from "./UpdateOrgan";

const OrgansTable = () => {
  const { systemData } = useOrgansContext();
  const [openOrganId, setOpenOrganId] = useState<string | null>(null);

  if (!systemData || systemData.length === 0) {
    return (
      <EmptyState
        title="Órgãos do Paciente"
        description="Nenhum órgão encontrado."
        icon={<GiHeartOrgan className="w-12 h-12 text-gray-300" />}
      />
    );
  }

  const handleOpen = (id: string) => setOpenOrganId(id);
  const handleClose = () => setOpenOrganId(null);

  return (
    <div>
      <div className="grid sm:grid-cols-3 2xl:grid-cols-7 gap-4">
        {systemData.map((organ) => {
          const organIcon = getOrganIcon(organ.slug);

          return (
            <div key={organ.id}>
              <SelectableButton
                isSelected={false}
                label={organ.name}
                onClick={() => handleOpen(organ.id)}
                icon={organIcon}
              />

              <UpdateOrgan
                isOpen={openOrganId === organ.id}
                onClose={handleClose}
                organ={organ}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrgansTable;
