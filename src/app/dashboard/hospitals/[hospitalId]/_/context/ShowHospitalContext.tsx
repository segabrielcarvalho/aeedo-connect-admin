"use client";

import { useAxios, UseAxiosReturn } from "@/hooks/useAxios";
import apiRoutes from "@/routes/api";
import { useParams } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";
import { HospitalDetailsResponse } from "../dto";

interface ShowHospitalsContextType {
  hospitalQuery: UseAxiosReturn<HospitalDetailsResponse[]>;
}

const ShowHospitalsContext = createContext<
  ShowHospitalsContextType | undefined
>(undefined);

type ShowHospitalsProviderProps = { children: ReactNode };

export function ShowHospitalsContextProvider({
  children,
}: ShowHospitalsProviderProps) {
  const { hospitalId } = useParams();
  const url = `${apiRoutes.hospitals.show.path}/${hospitalId}`;
  const hospitalQuery = useAxios<HospitalDetailsResponse[]>({
    url,
    method: apiRoutes.hospitals.show.method,
  });

  console.log("hospitalQuery", hospitalQuery);

  const value: ShowHospitalsContextType = {
    hospitalQuery,
  };

  return (
    <ShowHospitalsContext.Provider value={value}>
      {children}
    </ShowHospitalsContext.Provider>
  );
}

export function useShowHospitalsContext() {
  const context = useContext(ShowHospitalsContext);
  if (!context) {
    throw new Error(
      "useShowHospitalsContext deve ser usado dentro de um ShowHospitalsProvider"
    );
  }
  return context;
}
