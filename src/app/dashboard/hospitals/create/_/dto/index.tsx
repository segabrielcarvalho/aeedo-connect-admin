import { z } from "zod";

export const addressSchema = z.object({
  city: z.string().min(1, "A cidade é obrigatória."),
  state: z.string().min(1, "O estado é obrigatório."),
  zipCode: z.string().min(1, "O CEP é obrigatório."),
  street: z.string().min(1, "A rua é obrigatória."),
  neighborhood: z.string().min(1, "O bairro é obrigatório."),
  houseNumber: z.string().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
});

export const createHospitalSchema = z
  .object({
    name: z
      .string()
      .min(1, "O nome é obrigatório.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),
    phone: z
      .string()
      .min(10, "O telefone deve ter no mínimo 10 caracteres.")
      .max(15, "O telefone deve ter no máximo 15 caracteres."),
    cnpj: z.string().regex(/^\d{14}$/, "O CNPJ deve ter 14 dígitos."),
    email: z
      .string()
      .email("O email deve ser válido.")
      .min(1, "O email é obrigatório."),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres.")
      .regex(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
      ),
    confirmPassword: z.string().min(1, "A confirmação de senha é obrigatória."),
    address: addressSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type CreateHospitalVariables = z.infer<typeof createHospitalSchema>;

export interface CreateHospitalResponse {
  data: {
    name: string;
    phone: string;
    cnpj: string;
    email: string;
    address: {
      city: string;
      state: string;
      zipCode: string;
      street: string;
      neighborhood: string;
      houseNumber: string;
      complement: string;
    };
  };
}
