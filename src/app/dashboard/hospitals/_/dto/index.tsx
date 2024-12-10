export interface AddressResponse {
  id: string;
  zipCode: string;
  street: string;
  neighbourhood: string;
  state: string;
  city: string;
  houseNumber: string;
  complement?: string | null;
}

export interface HospitalResponse {
  id: string;
  name: string;
  phone: string;
  email: string;
  companyDocument: string;
  status: boolean;
  address: AddressResponse | null;
}
