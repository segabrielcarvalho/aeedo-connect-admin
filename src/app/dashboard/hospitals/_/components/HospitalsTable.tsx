"use client";

import HospitalProfile from "@/components/HospitalInfo";
import Table from "@/components/Table";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import HospitalIcon from "../../../../../../public/hospitalIcon.svg";
import routes from "../../../../../routes";

export const HospitalsTable = () => {
  const router = useRouter();

  return (
    <Table
      onAction={(data) => {
        router.push(
          routes.dashboard.hospitals.show.path.replace(
            "[hospitalId]",
            data.id.toString()
          )
        );
      }}
      data={Array.from({ length: 5 }).map((_, index) => ({
        id: index,
        name: `Hospital ${index + 1}`,
        cnpj: "12.345.678/0001-91",
        phone: "(11) 99999-9999",
        email: "hospital@example.com",
        status: "Ativo",
        address_id: "id do endereço",
      }))}
      columns={[
        {
          header: "Hospital",
          render: (data) => (
            <HospitalProfile
              name={data.name}
              email={data.email}
              avatarUrl={HospitalIcon}
            />
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
          header: "Endereço",
          render: (data) => (
            <span className="text-gray-600 text-sm font-light ">
              {data.address_id}
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
