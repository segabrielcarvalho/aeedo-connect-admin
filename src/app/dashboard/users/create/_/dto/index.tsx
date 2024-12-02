export interface CreateUserVariables {
  data: {
    name: string;
    email: string;
    password: string;
    role: "admin" | "user";
    patientType?: "receptor" | "doador";
    organs?: string[];
  };
}
