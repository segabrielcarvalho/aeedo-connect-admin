import { BloodTypeEnum } from "../../../../../dto/global";

export interface Address {
  id: string;
  zipCode: string;
  street: string;
  neighbourhood: string;
  state: string;
  city: string;
  houseNumber: string;
  complement?: string | null;
}

export interface Hospital {
  id: string;
  name: string;
  phone: string;
  email: string;
  companyDocument: string;
  status: boolean;
  address?: Address | null;
}

export interface Organ {
  id: string;
  name: string;
  slug: string;
  organType: string;
}

export interface PatientDetails {
  id: string;
  patientType: "donor" | "receiver";
  bloodType: BloodTypeEnum;
  hospitals: Hospital[];
  organs: Organ[];
}

export interface PatientDetailsResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      document?: string | null;
      birthDate?: string | null;
      isActive?: boolean;
    };
    patient: PatientDetails;
    address?: Address | null;
    hasOrgansSelected: boolean;
  };
}
