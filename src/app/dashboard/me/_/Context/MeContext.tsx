"use client";
import { useAxios } from "@/hooks/useAxios";
import apiRoutes from "@/routes/api";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useAuthContext } from "../../../../../contexts/AuthContext";
import {
  Address,
  Hospital,
  Organ,
  PatientDetails,
  PatientDetailsResponse,
} from "../dto";

interface MeContextType {
  patientDetails: {
    user: PatientDetailsResponse["data"]["user"];
    patient: PatientDetails;
    address: Address | null;
    hospitals: Hospital[];
    organs: Organ[];
  } | null;
  isLoading: boolean;
}

const MeContext = createContext<MeContextType | undefined>(undefined);

type MeContextProviderProps = { children: ReactNode };

export function MeContextProvider({ children }: MeContextProviderProps) {
  const { user } = useAuthContext();
  const patientId = user?.patientId;

  const { data: patientDetailsData, isLoading } =
    useAxios<PatientDetailsResponse>({
      url: apiRoutes.patient.details.path,
      method: apiRoutes.patient.details.method,
      params: patientId ? { id: patientId } : undefined,
    });

  const patientDetails = useMemo(() => {
    if (!patientDetailsData?.data) return null;

    const { user, patient, address } = patientDetailsData.data;

    return {
      user,
      patient,
      address: address || null,
      hospitals: patient?.hospitals || [],
      organs: patient?.organs || [],
    };
  }, [patientDetailsData]);

  const value: MeContextType = {
    patientDetails,
    isLoading,
  };

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
}

export const useMeContext = () => {
  const context = useContext(MeContext);
  if (!context) {
    throw new Error("useMeContext must be used within a MeContextProvider");
  }
  return context;
};
