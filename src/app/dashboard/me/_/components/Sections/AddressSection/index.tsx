import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import { AddressField } from "../../AddressField";

const AddressSection: React.FC = () => {
  const addresses = [
    {
      id: 1,
      zipCode: "12345-678",
      street: "Rua das Flores",
      neighborhood: "Jardim Primavera",
      state: "SP",
      city: "São Paulo",
      houseNumber: "100",
      complement: "Apt 202",
      createdAt: "2023-11-29T10:00:00Z",
    },
  ];

  const handleUpdate = (id: number) => {
    console.log(`Atualizar endereço com ID: ${id}`);
  };

  return (
    <div>
      <SectionHeading
        title="Endereços"
        description="Gerencie seus endereços abaixo."
      />

      <div className="text-sm/6 divide-y divide-gray-100 grid gap-y-6 grid-cols-3">
        {addresses.map((address) => (
          <AddressField
            key={address.id}
            zipCode={address.zipCode}
            street={address.street}
            neighborhood={address.neighborhood}
            state={address.state}
            city={address.city}
            houseNumber={address.houseNumber}
            complement={address.complement}
            createdAt={address.createdAt}
            onUpdate={() => handleUpdate(address.id)}
          />
        ))}
      </div>

      <Button className="w-full mt-6" color="primary" variant="unstyled">
        + Adicionar Endereço
      </Button>
    </div>
  );
};

export default AddressSection;
