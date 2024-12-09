"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { PasswordStrengthBar } from "@/components/PasswordStrengthBar";
import RoleButton from "@/components/RoleButton";
import SectionHeading from "@/components/SectionHeading";
import SelectableButton from "@/components/SelectableButton";
import { RoleEnum, RolePatientEnum } from "@/contexts/AuthContext";
import { BloodTypeEnum } from "@/dto/global";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useToastHook from "@/hooks/useToastHook";
import routes from "@/routes";
import apiRoutes from "@/routes/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import OrgansList from "./_/components/OrgansList";
import {
  CreateUserResponse,
  createUserSchema,
  CreateUserVariables,
} from "./_/dto";

const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const { error, success } = useToastHook();

  const [submit, { loading }] = useAxiosMutation<
    CreateUserResponse,
    CreateUserVariables
  >({
    url: apiRoutes.users.register.path,
    method: apiRoutes.users.register.method,
  });

  const {
    control,
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateUserVariables>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      patient_type: undefined,
      blood_type: BloodTypeEnum.APositive,
      organs: [],
      confirmPassword: "",
    },
  });

  const role = watch("role");
  const patientType = watch("patient_type");
  const selectedOrgans = watch("organs") || [];

  const submitImplementation: SubmitHandler<CreateUserVariables> = async (
    args
  ) => {
    try {
      await submit({ variables: args });
      success({ message: "Usuário criado com sucesso." });
      reset();
      router.push(routes.dashboard.users.path);
    } catch (e) {
      console.error(e);
      error({ message: "Erro ao criar Usuário." });
    }
  };

  return (
    <form
      className="space-y-12 w-full"
      onSubmit={handleSubmit(submitImplementation)}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <SectionHeading
            title="Informações Básicas"
            description="Preencha as informações abaixo para criar um novo usuário."
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="name"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Nome Completo"
                placeholder='Ex: "Maria Silva"'
                name={name}
                isRequired
                error={errors?.name}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Email"
                placeholder='Ex: "user@user.com"'
                name={name}
                isRequired
                error={errors?.email}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="password"
            render={({ field: { name, onChange, ref, value } }) => (
              <div className="space-y-3">
                <Input
                  ref={ref}
                  onChange={onChange}
                  value={value}
                  type="password"
                  label="Senha"
                  placeholder="Digite uma senha"
                  name={name}
                  isRequired
                  error={errors?.password}
                />
                <PasswordStrengthBar password={value} />
              </div>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { name, onChange, ref, value } }) => (
              <div className="space-y-3">
                <Input
                  ref={ref}
                  onChange={onChange}
                  value={value}
                  type="password"
                  label="Confirmar Senha"
                  placeholder="Confirme sua senha"
                  name={name}
                  isRequired
                  error={errors.confirmPassword}
                />
              </div>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <SectionHeading
          title="Escolha de Função"
          description="Selecione o tipo de usuário que deseja criar."
        />
        <div className="grid grid-cols-7 gap-4">
          <SelectableButton
            isSelected={role === "admin"}
            label="Administrador"
            onClick={() => setValue("role", RoleEnum.ADMIN)}
            icon={<GrUserAdmin className="w-7 h-7 font-thin" />}
          />
          <SelectableButton
            isSelected={role === "user"}
            label="Usuário"
            onClick={() => setValue("role", RoleEnum.USER)}
            icon={<FaRegUser className="w-8 h-8" />}
          />
        </div>
      </div>

      {role === "user" && (
        <>
          <div className="grid grid-cols-1 gap-8">
            <SectionHeading
              title="Configurações de Paciente"
              description="Selecione o tipo de paciente."
            />

            <div className="grid grid-cols-2 gap-10 mt-8">
              <RoleButton
                role={RolePatientEnum.DONOR}
                selectedRole={patientType}
                onSelect={(role) => setValue("patient_type", role)}
              />
              <RoleButton
                role={RolePatientEnum.RECIPIENT}
                selectedRole={patientType}
                onSelect={(role) => setValue("patient_type", role)}
              />
            </div>
            {errors?.patient_type && (
              <p className="text-red-500 text-sm">
                {errors.patient_type.message}
              </p>
            )}
          </div>

          {patientType && (
            <OrgansList setValue={setValue} selectedOrgans={selectedOrgans} />
          )}
        </>
      )}

      <div className="mt-6 flex items-center justify-end gap-x-3">
        <Button
          variant="outline"
          color="primary"
          type="button"
          className="rounded-md px-5"
          onClick={() => router.push(routes.dashboard.users.path)}
        >
          Cancelar
        </Button>
        <Button
          variant="solid"
          color="secondary"
          className="rounded-md px-12"
          type="submit"
          isLoading={loading}
        >
          Criar
        </Button>
      </div>
    </form>
  );
};

export default CreateUserPage;
