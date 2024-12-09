"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAxios } from "@/hooks/useAxios";
import apiRoutes from "@/routes/api";
import { createContext, ReactNode, useContext } from "react";
import { OrganResponse } from "../dto";

interface OrgansContextType {
  organsPatientData?: OrganResponse[] | null;
  systemData?: OrganResponse[] | null;
  refetchOrgansPatientData: () => void;
  refetchSystemData: () => void;
}

const OrgansContext = createContext<OrgansContextType | undefined>(undefined);

type OrgansProviderProps = { children: ReactNode };

export function OrgansContextProvider({ children }: OrgansProviderProps) {
  const { user } = useAuthContext();

  const { data: organsPatientData, refetch: refetchOrgansPatientData } =
    useAxios<OrganResponse[]>({
      url: apiRoutes.organs.listPatientOrgans.path,
      method: apiRoutes.organs.listPatientOrgans.method,
      params: { patientId: user?.patientId },
    });

  const { data: systemData, refetch: refetchSystemData } = useAxios<
    OrganResponse[]
  >({
    url: apiRoutes.organs.allocate.path,
    method: apiRoutes.organs.allocate.method,
  });

  const value: OrgansContextType = {
    organsPatientData,
    systemData,
    refetchOrgansPatientData,
    refetchSystemData,
  };

  return (
    <OrgansContext.Provider value={value}>{children}</OrgansContext.Provider>
  );
}

export function useOrgansContext() {
  const context = useContext(OrgansContext);
  if (!context) {
    throw new Error(
      "useOrgansContext deve ser usado dentro de um OrgansProvider"
    );
  }
  return context;
}
