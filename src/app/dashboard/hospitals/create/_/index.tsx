"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import SectionHeading from "@/components/SectionHeading";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useToastHook from "@/hooks/useToastHook";
import routes from "@/routes";
import apiRoutes from "@/routes/api";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useHospitalsContext } from "../../_/context/HospitalContext";
import { CreateHospitalVariables } from "./dto";

export const CreateHospital = () => {
  const router = useRouter();
  const {
    hospitalQuery: { refetch },
  } = useHospitalsContext();
  const { error, success } = useToastHook();
  const { control, reset, handleSubmit } = useForm<CreateHospitalVariables>();

  const [submit, { loading }] = useAxiosMutation({
    url: apiRoutes.hospitals.admin.create.path,
    method: apiRoutes.hospitals.admin.create.method,
  });

  const submitImplementation: SubmitHandler<CreateHospitalVariables> = async (
    args
  ) => {
    try {
      await submit({ variables: args });
      success({ message: "Hospital criado com sucesso." });
      reset();
      router.push(routes.dashboard.hospitals.path);
      refetch();
    } catch (e) {
      console.error(e);
      error({ message: "Erro ao criar Hospital." });
    }
  };

  return (
    <form
      className="space-y-12 w-full"
      onSubmit={handleSubmit(submitImplementation)}
    >
      <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
        <div>
          <SectionHeading
            title="Informações Básicas"
            description="Preencha as informações abaixo para criar um novo hospital."
          />
        </div>
        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="name"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Nome da Instituição"
                placeholder='Ex: "Hospital São Paulo"'
                name={name}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Email"
                placeholder='Ex: "user@user.com"'
                name={name}
                isRequired
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="phone"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Telefone"
                placeholder='Ex: "(11) 99999-9999"'
                name={name}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="company_document"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="CNPJ"
                placeholder="Insira seu CNPJ"
                name={name}
                isRequired
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-col md:grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <SectionHeading
            title="Endereço"
            description="Preencha os campos para adicionar o endereço do hospital."
          />
        </div>
        <div className="space-y-3">
          <Controller
            control={control}
            name="zip_code"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Caixa Postal"
                placeholder="CEP"
                name={name}
                isRequired
              />
            )}
          />
          <Controller
            control={control}
            name="street"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Rua"
                placeholder='Ex: "Rua Oscar Niemeyer"'
                name={name}
                isRequired
              />
            )}
          />
          <Controller
            control={control}
            name="neighbourhood"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Bairro"
                placeholder='Ex: "Av. Filostro"'
                name={name}
                isRequired
              />
            )}
          />
          <Controller
            control={control}
            name="house_number"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Número"
                placeholder='Ex: "90"'
                name={name}
                isRequired
              />
            )}
          />
        </div>

        <div className="space-y-3">
          <Controller
            control={control}
            name="complement"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Complemento"
                placeholder='Ex: "Próximo ao mercado"'
                name={name}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Cidade"
                placeholder='Ex: "São Paulo"'
                name={name}
                isRequired
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Estado"
                placeholder='Ex: "Goiás"'
                name={name}
                isRequired
              />
            )}
          />
        </div>
      </div>

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
