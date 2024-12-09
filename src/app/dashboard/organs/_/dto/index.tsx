import { z } from "zod";

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
