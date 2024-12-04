"use client";

import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import ProfileField from "../../ProfileField";

const ProfileSection: React.FC = () => {
  const profileData = [
    { id: "name", label: "Nome Completo", value: "Maria das Dores" },
    { id: "document", label: "Documento", value: "123.456.789-00" },
    { id: "email", label: "Email", value: "maria.dores@example.com" },
    { id: "birthDate", label: "Data de Nascimento", value: "01/01/1980" },
    { id: "role", label: "Função", value: "Administrador" },
    { id: "type", label: "Tipo", value: "Doador" },
    { id: "isActive", label: "Ativo", value: "Sim" },
    { id: "createdAt", label: "Criado em", value: "29/11/2023" },
  ];

  const handleEdit = (id: string) => {
    console.log(`Editar campo com ID: ${id}`);
  };

  return (
    <div>
      <SectionHeading
        title="Perfil"
        description="Esta informação será exibida publicamente, então tenha cuidado com o que você compartilha."
      />
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
