export interface CreateHospitalVariables {
  data: {
    name: string;
    phone: string;
    cnpj: string;
    email: string;
    password: string;
  };
}

export interface CreateHospitalAddressVariables {
  data: {
    city: string;
    state: string;
    zipCode: string;
    street: string;
    neighborhood: string;
    houseNumber: string;
    complement: string;
  };
}
