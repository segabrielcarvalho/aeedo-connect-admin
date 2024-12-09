"use client";

import EmptyState from "@/components/EmptyState";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAxios } from "@/hooks/useAxios";
import apiRoutes from "@/routes/api";
import { GiHeartOrgan } from "react-icons/gi";

export const OrgansUsersTable = () => {
  const { user } = useAuthContext();

  const { data } = useAxios({
    url: apiRoutes.organs.listPatientOrgans.path,
    method: apiRoutes.organs.listPatientOrgans.method,
    params: user?.patientId
      ? { patientId: user.patientId }
      : { patientId: "123" },
  });

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
      <h1>Órgãos do Paciente {JSON.stringify(data?.message)}</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map((organ: any) => (
            <li key={organ.id}>{organ.name}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhum órgão encontrado.</p>
      )}
    </div>
  );
};
