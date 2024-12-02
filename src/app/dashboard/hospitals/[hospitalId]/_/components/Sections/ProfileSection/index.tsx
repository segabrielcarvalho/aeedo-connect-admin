"use client";

import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import ProfileField from "../../ProfileField";

const ProfileSection: React.FC = () => {
  const profileData = [
    { id: "name", label: "Nome Completo", value: "Hospital Santa Cruz" },
    { id: "cnpj", label: "CNPJ", value: "12.345.678/0001-91" },
    { id: "phone", label: "Telefone", value: "(62) 9 82595874" },
    { id: "email", label: "Email", value: "hospitalsc@example.com" },
    { id: "status", label: "Ativo", value: "Sim" },
    { id: "address_id", label: "Endereço", value: "id do endereço" },
    { id: "createdAt", label: "Criado em", value: "29/11/2023" },
  ];

  const handleEdit = (id: string) => {};

  return (
    <div>
      <SectionHeading title="Perfil" />
      <Button
        className="justify-end w-full mt-6"
        color="primary"
        variant="unstyled"
      >
        Editar
      </Button>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
        {profileData.map((field) => (
          <ProfileField
            key={field.id}
            label={field.label}
            value={field.value}
            onEdit={() => handleEdit(field.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSection;
