export interface HospitalDetailsResponse {
  hospital: Hospital;
  donors: PatientOrganHospitalDetail[];
  recipients: PatientOrganHospitalDetail[];
}

export interface Hospital {
  name: string;
  phone: string;
  email: string;
  companyDocument: string;
  status: boolean;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PatientOrganHospitalDetail {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  patientType: string;
  bloodType: string;
  organs: Organ[];
}

export interface Organ {
  id: number;
  name: string;
  organType: string;
  slug: string;
}
