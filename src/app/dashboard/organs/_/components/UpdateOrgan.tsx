"use client";

import { Input } from "@/components/Form/Input";
import Modal from "@/components/Modal";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useToastHook from "@/hooks/useToastHook";
import apiRoutes from "@/routes/api";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { OrganResponse, UpdateOrganVariables } from "../dto";

export const UpdateOrgan = ({
  isOpen,
  onClose,
  organ,
}: {
  isOpen: boolean;
  onClose: () => void;
  organ: OrganResponse;
}) => {
  const { error, success } = useToastHook();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateOrganVariables>({
    defaultValues: {
      name: organ.name || "",
      slug: organ.slug || "",
    },
  });

  const [submit, { loading }] = useAxiosMutation<
    OrganResponse,
    UpdateOrganVariables
  >({
    url: `${apiRoutes.organs.admin.update.path}/${organ.id}`,
    method: apiRoutes.organs.admin.update.method,
  });

  const submitImplementation: SubmitHandler<UpdateOrganVariables> = async (
    args
  ) => {
    try {
      await submit({ variables: args });
      success({ message: "Órgão atualizado com sucesso." });
      reset(args);
      onClose();
    } catch (e) {
      console.error(e);
      error({ message: "Erro ao atualizar Órgão." });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Editar Órgão"
        position="top"
        description="Edite as informações do órgão abaixo e salve as alterações."
        onClose={onClose}
        size="lg"
        onOk={handleSubmit(submitImplementation)}
        buttonsLabel={{
          confirm: loading ? "Salvando..." : "Salvar",
          cancel: "Cancelar",
        }}
        closeOnOverlayClick={false}
      >
        <div className="space-y-6">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <Input
                label="Nome"
                placeholder='Ex: "Coração"'
                isRequired
                error={errors.name}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="slug"
            render={({ field }) => (
              <Input
                label="Slug"
                placeholder="Ex: coracao"
                isRequired
                error={errors.slug}
                {...field}
              />
            )}
          />
        </div>
      </Modal>
    </>
  );
};
