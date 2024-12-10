"use client";

import EmptyState from "@/components/EmptyState";
import HospitalProfile from "@/components/HospitalInfo";
import Table from "@/components/Table";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaRegHospital } from "react-icons/fa6";
import { useHospitalsContext } from "../context/HospitalContext";

export const HospitalsTable = () => {
  const {
    hospitalQuery: { data },
  } = useHospitalsContext();

  if (data?.length === 0) {
    return (
      <EmptyState
        title="Nenhum hospital encontrado"
        description="Não foi possível encontrar nenhum hospital cadastrado."
        icon={<FaRegHospital className="w-12 h-12 text-gray-300" />}
      />
    );
  }

  return (
    <Table
      data={data?.map((hospital) => hospital) || []}
      columns={[
        {
          header: "Hospital",
          render: (data) => (
            <HospitalProfile name={data.name} email={data.email} />
          ),
          alwaysVisible: true,
        },
        {
          header: "Telefone",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.phone}
            </span>
          ),
        },
        {
          header: "Email",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.email}
            </span>
          ),
        },
        {
          header: "CNPJ",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.companyDocument}
            </span>
          ),
        },
        {
          header: "Ativo",
          render: (data) => (
            <span>
              {data.status ? (
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
