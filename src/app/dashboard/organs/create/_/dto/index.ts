import { z } from "zod";

export interface CreateOrganResponse {
  data: {
    name: string;
    organ_type: string;
    slug: string;
  };
}

export const createOrganSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório.")
    .max(100, "O nome deve ter no máximo 100 caracteres."),
  organ_type: z
    .string()
    .min(1, "O tipo de órgão é obrigatório.")
    .max(50, "O tipo de órgão deve ter no máximo 50 caracteres."),
  slug: z
    .string()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "O slug deve conter apenas letras minúsculas, números e hífens, sem espaços."
    )
    .min(1, "O slug é obrigatório.")
    .max(50, "O slug deve ter no máximo 50 caracteres."),
});
export type CreateOrganVariables = z.infer<typeof createOrganSchema>;
