"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { useAxios } from "@/hooks/useAxios";
import { useLazyAxios } from "@/hooks/useLazyAxios";
import apiRoutes from "@/routes/api";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
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
  organsPatientData?: Organ[] | null;
  systemData?: Organ[] | null;
  systemHospitals?: Hospital[] | null;
  isLoading: boolean;
  refetchDetails: () => void;
  refetchOrgansPatientData: () => void;
  refetchSystemData: () => void;
}

const MeContext = createContext<MeContextType | undefined>(undefined);

type MeContextProviderProps = { children: ReactNode };

export function MeContextProvider({ children }: MeContextProviderProps) {
  const { user } = useAuthContext();
  const patientId = user?.patientId;

  const { data: systemHospitals } = useAxios({
    url: apiRoutes.hospitals.list.path,
    method: apiRoutes.hospitals.list.method,
  });

  const [executeDetails, { data: patientDetailsData, isLoading }] =
    useLazyAxios<PatientDetailsResponse["data"]>();

  const fetchPatientDetails = useCallback(() => {
    if (patientId) {
      executeDetails({
        url: `${apiRoutes.patient.details.path}/${patientId}`,
        method: apiRoutes.patient.details.method,
      });
    }
  }, [executeDetails, patientId]);

  useEffect(() => {
    fetchPatientDetails();
  }, [fetchPatientDetails]);

  const patientDetails = useMemo(() => {
    if (!patientDetailsData) return null;

    const { user: userData, patient, address } = patientDetailsData;

    return {
      user: userData,
      patient,
      address: address || null,
      hospitals: patient?.hospitals || [],
      organs: patient?.organs || [],
    };
  }, [patientDetailsData]);

  const { data: organsPatientData, refetch: refetchOrgansPatientData } =
    useAxios<Organ[]>({
      url: apiRoutes.organs.listPatientOrgans.path,
      method: apiRoutes.organs.listPatientOrgans.method,
      params: { patientId: user?.patientId },
    });

  const { data: systemData, refetch: refetchSystemData } = useAxios<Organ[]>({
    url: apiRoutes.organs.allocate.path,
    method: apiRoutes.organs.allocate.method,
  });

  const value: MeContextType = {
    patientDetails,
    organsPatientData,
    systemData,
    isLoading,
    systemHospitals,
    refetchDetails: fetchPatientDetails,
    refetchOrgansPatientData,
    refetchSystemData,
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
