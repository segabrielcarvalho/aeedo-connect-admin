"use client";

import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import Modal from "@/components/Modal";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import apiRoutes from "@/routes/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useMeContext } from "../Context/MeContext";

const addressSchema = z.object({
  zip_code: z
    .string()
    .length(8, "CEP deve ter 8 caracteres")
    .regex(/^\d+$/, "CEP deve conter apenas números"),
  street: z.string().min(5, "Rua deve ter no mínimo 5 caracteres").max(100),
  neighbourhood: z.string().min(5, "Bairro deve ter no mínimo 5 caracteres"),
  state: z.string().length(2, "Estado deve ter 2 caracteres"),
  city: z.string().min(5, "Cidade deve ter no mínimo 5 caracteres").max(100),
  house_number: z.string().min(1, "Número deve ser preenchido").max(100),
  complement: z.string().optional(),
});

type AddressFormValues = z.infer<typeof addressSchema>;

export const UpdateAddressButton: React.FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { patientDetails, refetchDetails } = useMeContext();
  const { success, error } = useToastHook();

  const address = patientDetails?.address;

  const [createAddressMutation] = useAxiosMutation({
    url: apiRoutes.addresses.create.path,
    method: apiRoutes.addresses.create.method,
  });

  const [updateAddressMutation] = useAxiosMutation({
    url: `${apiRoutes.addresses.update.path}/${address?.id}`,
    method: apiRoutes.addresses.update.method,
  });

  const defaultValues = {
    zip_code: address?.zipCode || "",
    street: address?.street || "",
    neighbourhood: address?.neighbourhood || "",
    state: address?.state || "",
    city: address?.city || "",
    house_number: address?.houseNumber || "",
    complement: address?.complement || "",
  };

  const { control, handleSubmit, reset } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<AddressFormValues> = async (data) => {
    try {
      if (address?.id) {
        await updateAddressMutation({ variables: data });
        success({ message: "Endereço atualizado com sucesso!" });
      } else {
        await createAddressMutation({ variables: data });
        success({ message: "Endereço criado com sucesso!" });
      }

      refetchDetails();
      onClose();
    } catch (err: any) {
      error({
        message: err.response?.data?.message || "Erro ao salvar o endereço",
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => {
          reset(defaultValues);
          onOpen();
        }}
        className="w-full mt-6"
        color="primary"
        variant="unstyled"
      >
        {address ? "Atualizar Endereço" : "+ Adicionar Endereço"}
      </Button>

      <Modal
        position="top"
        title={address ? "Atualizar Endereço" : "Adicionar Endereço"}
        isOpen={isOpen}
        size="lg"
        onClose={onClose}
        onOk={handleSubmit(onSubmit)}
        buttonsLabel={{
          confirm: address ? "Salvar Alterações" : "Criar Endereço",
          cancel: "Cancelar",
        }}
        closeOnOverlayClick={false}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="zip_code"
            render={({ field }) => (
              <Input
                {...field}
                label="CEP"
                placeholder="Digite o CEP"
                maxLength={8}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="street"
            render={({ field }) => (
              <Input
                {...field}
                label="Rua"
                placeholder="Digite a rua"
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="neighbourhood"
            render={({ field }) => (
              <Input
                {...field}
                label="Bairro"
                placeholder="Digite o bairro"
                isRequired
              />
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Cidade"
                  placeholder="Digite a cidade"
                  isRequired
                />
              )}
            />

            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Estado"
                  placeholder="Digite o estado"
                  maxLength={2}
                  isRequired
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="house_number"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Número"
                  placeholder="Digite o número"
                  isRequired
                />
              )}
            />

            <Controller
              control={control}
              name="complement"
              render={({ field }) => (
                <Input
                  {...field}
                  label="Complemento"
                  placeholder="Digite o complemento"
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
