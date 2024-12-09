"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import SelectInput from "@/components/Form/SelectInput";
import { Logo } from "@/components/Logo";
import { PasswordStrengthBar } from "@/components/PasswordStrengthBar";
import RoleButton from "@/components/RoleButton";
import { RoleEnum, RolePatientEnum } from "@/contexts/AuthContext";
import { BloodTypeEnum } from "@/dto/global";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useToastHook from "@/hooks/useToastHook";
import routes from "@/routes";
import apiRoutes from "@/routes/api";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CreatePatientResponse,
  createPatientSchema,
  CreatePatientVariables,
} from "./_/dto";

const RegisterPage = () => {
  const router = useRouter();
  const { error, success } = useToastHook();
  const {
    control,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePatientVariables>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: RoleEnum.USER,
      patient_type: null,
      confirmPassword: "",
      blood_type: BloodTypeEnum.APositive,
      organs: [],
    },
  });

  const [submit, { loading }] = useAxiosMutation<
    CreatePatientResponse,
    CreatePatientVariables
  >({
    url: apiRoutes.users.register.path,
    method: apiRoutes.users.register.method,
  });

  const selectedRole = watch("patient_type") ?? null;

  const submitImplementation: SubmitHandler<CreatePatientVariables> = async (
    args
  ) => {
    try {
      await submit({ variables: args });
      success({ message: "Conta criada com sucesso." });
      reset();
      router.push(routes.auth.login.path);
    } catch (e) {
      console.error(e);
      error({ message: "Erro ao criar conta." });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitImplementation)}
      className="space-y-12 w-full max-w-sm lg:w-96 mx-auto"
    >
      <div>
        <Logo className="w-auto h-10" />

        <h2 className="mt-8 text-2xl font-bold tracking-tight text-gray-900">
          Crie sua conta
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Já tem uma conta?{" "}
          <NextLink
            href={routes.auth.login.path}
            className="font-normal text-primary-default hover:text-primary-700"
          >
            Entre agora
          </NextLink>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-8">
        <RoleButton
          role={RolePatientEnum.DONOR}
          selectedRole={selectedRole}
          onSelect={(role) => setValue("patient_type", role)}
        />
        <RoleButton
          role={RolePatientEnum.RECIPIENT}
          selectedRole={selectedRole}
          onSelect={(role) => setValue("patient_type", role)}
        />
      </div>

      <div className="space-y-6 mt-10">
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, ref, name } }) => (
            <Input
              ref={ref}
              onChange={onChange}
              label="Nome"
              placeholder="Seu nome completo"
              name={name}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, ref, name } }) => (
            <Input
              ref={ref}
              onChange={onChange}
              label="Email"
              placeholder="seuemail@exemplo.com"
              name={name}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name="blood_type"
          render={({ field: { onChange, ref, name, value } }) => (
            <SelectInput
              value={value}
              options={Object.values(BloodTypeEnum).map((value) => ({
                value,
                label: value,
              }))}
              onChange={onChange}
              label="Tipo Sanguíneo"
              placeholder="Selecione seu tipo sanguíneo"
              name={name}
              isRequired
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, ref, name } }) => (
            <>
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Senha"
                type="password"
                placeholder="Crie uma senha"
                name={name}
                isRequired
                error={errors.password}
              />
              <PasswordStrengthBar password={value} />
            </>
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value, ref, name } }) => (
            <Input
              ref={ref}
              onChange={onChange}
              value={value}
              label="Confirmar Senha"
              type="password"
              placeholder="Confirme sua senha"
              name={name}
              isRequired
              error={errors.confirmPassword}
            />
          )}
        />
      </div>

      <div className="text-sm text-gray-500 mt-4">
        Ao se registrar, você concorda com nossos{" "}
        <NextLink
          href="#"
          className="font-medium text-primary-default hover:text-primary-700 ml-1"
        >
          Termos de Serviço
        </NextLink>{" "}
        e nossa{" "}
        <NextLink
          href="#"
          className="font-medium text-primary-default hover:text-primary-700 ml-1"
        >
          Política de Privacidade
        </NextLink>
        .
      </div>

      <div className="mt-6">
        <Button
          className="w-full"
          color="secondary"
          variant="solid"
          type="submit"
          isLoading={loading}
          isDisabled={!selectedRole}
        >
          Registrar-se
        </Button>
      </div>
    </form>
  );
};

export default RegisterPage;
