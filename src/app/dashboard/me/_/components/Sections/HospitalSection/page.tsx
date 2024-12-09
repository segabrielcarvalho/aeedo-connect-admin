"use client";

import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import { useMeContext } from "../../../Context/MeContext";
import { HospitalField } from "../../HospitalField";

const HospitalSection: React.FC = () => {
  const { patientDetails } = useMeContext();
  const hospitals = patientDetails?.hospitals || [];

  const handleEditHospital = (id: number) => {
    console.log(`Editar hospital com ID: ${id}`);
  };

  const handleAddHospital = () => {
    console.log("Adicionar novo hospital");
  };

  return (
    <div>
      <SectionHeading
        title="Hospitais"
        description="Gerencie os hospitais vinculados ao seu perfil."
      />

      {hospitals.length > 0 ? (
        <div className="grid gap-4 mt-6">
          {hospitals.map((hospital) => (
            <HospitalField key={hospital.id} hospital={hospital} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Nenhum hospital encontrado.</p>
      )}

      <Button
        className="w-full mt-6"
        color="primary"
        variant="unstyled"
        onClick={handleAddHospital}
      >
        {hospitals.length > 0
          ? "+ Vincular Novo Hospital"
          : "+ Adicionar Hospital"}
      </Button>
    </div>
  );
};

export default HospitalSection;
