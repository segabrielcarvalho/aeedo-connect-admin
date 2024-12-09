"use client";

import SectionHeading from "@/components/SectionHeading";
import React from "react";
import { useMeContext } from "../../../Context/MeContext";
import { AddressField } from "../../AddressField";
import { UpdateAddressButton } from "../../UpdateAddressButton";

const AddressSection: React.FC = () => {
  const { patientDetails } = useMeContext();
  const address = patientDetails?.address;

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
        />
      ) : (
        <p className="text-gray-500 mt-4">Nenhum endereço encontrado.</p>
      )}

      <UpdateAddressButton />
    </div>
  );
};

export default AddressSection;
