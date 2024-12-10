import { z } from "zod";
import { OrganType } from "../../../../../dto/global";

export interface OrganResponse {
  id: string;
  name: string;
  organType: string;
  slug: string;
}

export const organsActionSchema = z.object({
  organs: z
    .object({
      connect: z
        .array(
          z.object({
            id: z.string().uuid("O ID deve ser um UUID válido."),
          })
        )
        .optional(),
      disconnect: z
        .array(
          z.object({
            id: z.string().uuid("O ID deve ser um UUID válido."),
          })
        )
        .optional(),
    })
    .optional(),
});

export type ChooseOrgansVariables = z.infer<typeof organsActionSchema>;

export const updateOrganSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter no mínimo 3 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  organ_type: z.nativeEnum(OrganType, {
    errorMap: () => ({ message: "Tipo de órgão inválido" }),
  }),
  slug: z
    .string()
    .min(3, "O slug deve ter no mínimo 3 caracteres")
    .max(200, "O slug deve ter no máximo 200 caracteres"),
});

export type UpdateOrganVariables = z.infer<typeof updateOrganSchema>;

export interface OrganResponse {
  id: string;
  name: string;
  organ_type: OrganType;
  slug: string;
}
