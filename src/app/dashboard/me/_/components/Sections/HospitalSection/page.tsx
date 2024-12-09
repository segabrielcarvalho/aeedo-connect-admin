"use client";

import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import { HospitalField } from "../../HospitalField";

export interface Hospital {
  id: number;
  name: string;
  phone: string;
  email: string;
  cnpj: string;
  status: "Ativo" | "Inativo";
  address: {
    street: string;
    neighborhood: string;
    state: string;
    city: string;
    houseNumber: string;
    complement?: string;
    zipCode: string;
  };
}

const HospitalSection: React.FC = () => {
  const hospitals: Hospital[] = [
    {
      id: 1,
      name: "Hospital Santa Maria",
      phone: "(11) 98765-4321",
      email: "contato@santamaria.com",
      cnpj: "12.345.678/0001-90",
      status: "Ativo",
      address: {
        street: "Rua das Flores",
        neighborhood: "Jardim Primavera",
        state: "SP",
        city: "São Paulo",
        houseNumber: "100",
        complement: "Apto 202",
        zipCode: "12345-678",
      },
    },
  ];

  const handleAddHospital = () => {
    console.log("Adicionar novo hospital");
  };

  return (
    <div>
      <SectionHeading
        title="Hospitais"
        description="Gerencie os hospitais abaixo."
      />

      <ul role="list" className="mt-6 border-gray-200 text-sm/6">
        {hospitals.map((hospital) => (
          <HospitalField
            key={hospital.id}
            hospital={hospital}
            onEdit={handleAddHospital}
          />
        ))}
      </ul>

      <Button className="w-full mt-6" color="primary" variant="unstyled">
        + Adicionar Hospital
      </Button>
    </div>
  );
};

export default HospitalSection;
