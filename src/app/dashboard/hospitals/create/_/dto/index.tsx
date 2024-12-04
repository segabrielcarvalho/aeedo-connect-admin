export interface CreateHospitalVariables {
  data: {
    name: string;
    phone: number;
    cnpj: number;
    email: string;
    password: string;
  };
}

export interface CreateHospitalAddressVariables {
  data: {
    city: string;
    state: string;
    zipCode: number;
    street: string;
    neighborhood: string;
    houseNumber: number;
    complement: string;
  };
}
