export interface CreateHospitalVariables {
  name: string;
  phone: string;
  email: string;
  company_document: string;
  zip_code?: string;
  street?: string;
  neighbourhood?: string;
  state?: string;
  city?: string;
  house_number?: string;
  complement?: string | null;
  address_id?: string;
}

type CreateHospitalWithAddressId = Omit<
  CreateHospitalVariables,
  | "zip_code"
  | "street"
  | "neighbourhood"
  | "state"
  | "city"
  | "house_number"
  | "complement"
> & {
  address_id: string;
};

type CreateHospitalWithAddressFields = Omit<
  CreateHospitalVariables,
  "address_id"
> & {
  zip_code: string;
  street: string;
  neighbourhood: string;
  state: string;
  city: string;
  house_number: string;
};

export type CreateHospitalPayload =
  | CreateHospitalWithAddressId
  | CreateHospitalWithAddressFields;
