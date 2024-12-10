"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAxios, UseAxiosReturn } from "@/hooks/useAxios";
import apiRoutes from "@/routes/api";
import { createContext, ReactNode, useContext } from "react";
import { HospitalResponse } from "../dto";

interface HospitalsContextType {
  hospitalQuery: UseAxiosReturn<HospitalResponse[]>;
}

const HospitalsContext = createContext<HospitalsContextType | undefined>(
  undefined
);

type HospitalsProviderProps = { children: ReactNode };

export function HospitalsContextProvider({ children }: HospitalsProviderProps) {
  const { user } = useAuthContext();

  const hospitalQuery = useAxios<HospitalResponse[]>({
    url: apiRoutes.hospitals.list.path,
    method: apiRoutes.hospitals.list.method,
    params: { patientId: user?.patientId },
  });

  const value: HospitalsContextType = {
    hospitalQuery,
  };

  return (
    <HospitalsContext.Provider value={value}>
      {children}
    </HospitalsContext.Provider>
  );
}

export function useHospitalsContext() {
  const context = useContext(HospitalsContext);
  if (!context) {
    throw new Error(
      "useHospitalsContext deve ser usado dentro de um HospitalsProvider"
    );
  }
  return context;
}
