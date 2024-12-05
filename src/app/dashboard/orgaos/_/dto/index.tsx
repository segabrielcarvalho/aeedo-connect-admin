export interface CreateOrganVariables {
  data: {
    name: string;
    patientType?: "receptor" | "doador";
    organs?: string[];
  };
}
