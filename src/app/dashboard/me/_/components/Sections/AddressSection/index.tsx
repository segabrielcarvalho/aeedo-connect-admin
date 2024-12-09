"use client";

import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import { useMeContext } from "../../../Context/MeContext";
import { AddressField } from "../../AddressField";

const AddressSection: React.FC = () => {
  const { patientDetails } = useMeContext();
  const address = patientDetails?.address;

  const handleUpdate = () => {
    console.log(`Atualizar endereço`);
  };

  return (
    <div>
      <SectionHeading
        title="Endereço"
        description="Gerencie o endereço vinculado ao seu perfil."
      />

      {address ? (
        <AddressField
          zipCode={address.zipCode}
          street={address.street}
          neighborhood={address.neighbourhood}
          state={address.state}
          city={address.city}
          houseNumber={address.houseNumber || ""}
          complement={address.complement || ""}
          createdAt={address.createdAt}
          onUpdate={handleUpdate}
        />
      ) : (
        <p className="text-gray-500 mt-4">Nenhum endereço encontrado.</p>
      )}

      <Button className="w-full mt-6" color="primary" variant="unstyled">
        {address ? "Atualizar Endereço" : "+ Adicionar Endereço"}
      </Button>
    </div>
  );
};

export default AddressSection;
