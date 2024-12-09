import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { RolePatientEnum } from "../../../../../../contexts/AuthContext";

const organSchema = z.object({
  id: z.string().uuid("O ID do órgão deve ser um UUID válido."),
});

export const createUserSchema = z
  .object({
    name: z
      .string()
      .min(1, "O nome é obrigatório.")
      .max(100, "O nome deve ter no máximo 100 caracteres."),
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
    role: z.enum(["admin", "user"]).default("admin"),
    patient_type: z.enum(["donor", "recipient"]).nullable().optional(),
    blood_type: z
      .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
      .optional(),
    organs: z.array(organSchema).optional(),
  })
  .refine(
    (data) => {
      if (data.role === "admin") {
        return true;
      }
      return data.patient_type !== null && !!data.blood_type;
    },
    {
      message:
        "Para usuários do tipo 'user', os campos tipo de paciente e tipo sanguíneo são obrigatórios.",
      path: ["patient_type"],
    }
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type CreateUserVariables = z.infer<typeof createUserSchema>;

export interface OrganResponse {
  id: string;
  name: string;
  organType: string;
  slug: string;
}

export interface OrgansListProps {
  setValue: UseFormSetValue<CreateUserVariables>;
  selectedOrgans: { id: string }[];
}

interface UserDetails {
  patientType: RolePatientEnum;
  bloodType: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
}

interface Organ {
  name: string;
  organType: string;
}

export interface CreateUserResponse {
  data: {
    name: string;
    email: string;
    phone: string | null;
    document: string | null;
    role: string;
    birthDate: string | null;
    patient: UserDetails;
    organs: Organ[];
  };
}
