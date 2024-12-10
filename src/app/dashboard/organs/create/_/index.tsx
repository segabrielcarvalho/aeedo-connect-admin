"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import SectionHeading from "@/components/SectionHeading";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useToastHook from "@/hooks/useToastHook";
import routes from "@/routes";
import apiRoutes from "@/routes/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import SelectInput from "../../../../../components/Form/SelectInput";
import { OrganType } from "../../../../../dto/global";
import {
  CreateOrganResponse,
  createOrganSchema,
  CreateOrganVariables,
} from "./dto";

export const CreateOrganPage: React.FC = () => {
  const router = useRouter();
  const { error, success } = useToastHook();
  const { control, reset, handleSubmit } = useForm<CreateOrganVariables>({
    resolver: zodResolver(createOrganSchema),
    defaultValues: { name: "", organ_type: OrganType.NERVOSO, slug: "" },
  });

  const [submit, { loading }] = useAxiosMutation<
    CreateOrganResponse,
    CreateOrganVariables
  >({
    url: apiRoutes.organs.admin.create.path,
    method: apiRoutes.organs.admin.create.method,
  });

  const submitImplementation: SubmitHandler<CreateOrganVariables> = async (
    args
  ) => {
    try {
      await submit({ variables: args });
      success({ message: "Órgão criado com sucesso." });
      reset();
      router.push(routes.dashboard.organs.path);
    } catch (e) {
      console.error(e);
      error({ message: "Erro ao criar Órgão." });
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
            description="Preencha as informações abaixo para criar um novo Órgão."
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
                label="Nome"
                placeholder='Ex: "Coração"'
                name={name}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="organ_type"
            render={({ field }) => (
              <SelectInput
                label="Tipo de Órgão"
                isRequired
                options={Object.values(OrganType).map((type) => ({
                  label: type,
                  value: type,
                }))}
                {...field}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="slug"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Slug"
                placeholder="Ex: coracao"
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
          onClick={() => router.push(routes.dashboard.organs.path)}
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
