"use client";

import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import { useMemo } from "react";
import SectionHeading from "../../../../../components/SectionHeading";
import { useShowHospitalsContext } from "./context/ShowHospitalContext";

export const ShowExample = () => {
  const { hospitalQuery } = useShowHospitalsContext();
  const { data: hospitalData, isLoading, error } = hospitalQuery;
  const hospital = hospitalData ? hospitalData[0] : null;

  const days = useMemo(() => {
    if (!hospitalData) return [];

    return [
      {
        title: "Doadores",
        transactions: hospital?.donors?.map((donor) => ({
          id: donor.id,
          name: donor.name,
          email: donor.email,
          bloodType: donor.bloodType,
          patientType: donor.patientType,
          status: donor.isActive ? "Ativo" : "Inativo",
          icon: ArrowUpCircleIcon,
        })),
      },
      {
        title: "Receptores",
        transactions: hospital?.recipients?.map((recipient) => ({
          id: recipient.id,
          name: recipient.name,
          email: recipient.email,
          bloodType: recipient.bloodType,
          patientType: recipient.patientType,
          status: recipient.isActive ? "Ativo" : "Inativo",
          icon: ArrowDownCircleIcon,
        })),
      },
    ];
  }, [hospitalData]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar detalhes do hospital.</div>;
  }

  return (
    <main>
      <SectionHeading
        title={hospital?.hospital?.name || "Detalhes do Hospital"}
        description="Detalhes do Hospital"
      />

      <div className="py-16">
        {days.map((day) => (
          <div key={day.title} className="mb-12">
            <h2 className="text-xl font-bold text-gray-800">{day.title}</h2>
            <div className="mt-4 border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-100">
                {day.transactions?.map((transaction) => (
                  <li key={transaction.id} className="py-4 flex items-center">
                    <transaction.icon
                      className="h-6 w-6 text-gray-500"
                      aria-hidden="true"
                    />
                    <div className="ml-4 flex-auto">
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {transaction.email} - Tipo: {transaction.patientType}
                      </p>
                      <p className="text-sm text-gray-500">
                        Tipo Sanguíneo: {transaction.bloodType} - Status:{" "}
                        {transaction.status}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
