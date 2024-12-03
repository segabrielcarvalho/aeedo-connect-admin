export interface CreateHospitalVariables {
  data: {
    name: string;
    email: string;
    password: string;
    role: "admin";
    organs?: string[];
  };
}
