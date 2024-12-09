"use client";

import SectionHeading from "@/components/SectionHeading";
import { RoleEnum, useAuthContext } from "@/contexts/AuthContext";
import moment from "moment";
import React, { useMemo } from "react";
import { useMeContext } from "../../../Context/MeContext";
import ProfileField from "../../ProfileField";

const ProfileSection: React.FC = () => {
  const { user } = useAuthContext();
  const { patientDetails, isLoading } = useMeContext();

  const profileData = useMemo(() => {
    if (!user) return [];

    if (user.role === RoleEnum.ADMIN) {
      return [
        { id: "name", label: "Nome Completo", value: user.name || "-" },
        { id: "role", label: "Função", value: "Administrador" },
        { id: "email", label: "Email", value: user.email || "-" },
        {
          id: "isActive",
          label: "Ativo",
          value: user.isActive ? "Sim" : "Não",
        },
      ];
    }

    if (user.role === RoleEnum.USER && patientDetails) {
      const { user: userInfo, patient } = patientDetails;

      return [
        { id: "name", label: "Nome Completo", value: userInfo.name || "-" },
        { id: "document", label: "Documento", value: userInfo.document || "-" },
        { id: "email", label: "Email", value: userInfo.email || "-" },
        {
          id: "birthDate",
          label: "Data de Nascimento",
          value: userInfo.birthDate
            ? moment(userInfo.birthDate).format("DD/MM/YYYY")
            : "-",
        },
        {
          id: "role",
          label: "Função",
          value: userInfo.role === "user" ? "Usuário" : "Administrador",
        },
        {
          id: "patientType",
          label: "Tipo",
          value: patient.patientType === "donor" ? "Doador" : "Receptor",
        },
        {
          id: "bloodType",
          label: "Tipo Sanguíneo",
          value: patient.bloodType || "-",
        },
        {
          id: "isActive",
          label: "Ativo",
          value: userInfo.isActive ? "Sim" : "Não",
        },
      ];
    }

    return [];
  }, [user, patientDetails]);

  return (
    <div>
      <SectionHeading
        title="Meu Perfil"
        description="Aqui estão as informações do seu perfil."
      />
      {profileData.length > 0 ? (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
          {profileData.map((field) => (
            <ProfileField
              key={field.id}
              label={field.label}
              value={field.value}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">
          {user?.role === RoleEnum.USER && isLoading
            ? "Carregando dados do paciente..."
            : "Nenhum dado disponível."}
        </p>
      )}
    </div>
  );
};

export default ProfileSection;
