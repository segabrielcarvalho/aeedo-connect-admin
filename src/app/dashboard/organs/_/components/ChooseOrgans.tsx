import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Modal from "@/components/Modal";
import SelectableButton from "@/components/SelectableButton";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import apiRoutes from "@/routes/api";
import { getOrganIcon } from "@/utils/getOrganIcon";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GiHeartOrgan } from "react-icons/gi";
import { useOrgansContext } from "../context/OrgansContext";
import { ChooseOrgansVariables } from "../dto";

export const ChooseOrgans = () => {
  const { success, error } = useToastHook();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { handleSubmit } = useForm<ChooseOrgansVariables>();

  const [submit] = useAxiosMutation({
    url: apiRoutes.organs.choose.path,
    method: apiRoutes.organs.choose.method,
  });

  const { organsPatientData, systemData, refetchOrgansPatientData } =
    useOrgansContext();

  const [selectedOrgans, setSelectedOrgans] = useState<string[]>([]);

  const handleOpen = useCallback(() => {
    onOpen();
    const initialSelected = organsPatientData?.map((o) => o.id) || [];
    setSelectedOrgans(initialSelected);
  }, [onOpen, organsPatientData]);

  const toggleOrganSelection = (organId: string) => {
    setSelectedOrgans((prev) =>
      prev.includes(organId)
        ? prev.filter((id) => id !== organId)
        : [...prev, organId]
    );
  };

  const submitImplementation: SubmitHandler<
    ChooseOrgansVariables
  > = async () => {
    try {
      const initialSelected = organsPatientData?.map((o) => o.id) || [];
      const connectIds = selectedOrgans;
      const disconnectIds = initialSelected.filter(
        (id) => !selectedOrgans.includes(id)
      );

      const variables: ChooseOrgansVariables = {
        organs: {
          connect: connectIds.map((id) => ({ id })),
          disconnect: disconnectIds.map((id) => ({ id })),
        },
      };

      await submit({ variables });
      refetchOrgansPatientData();
      success({ message: "Órgãos atualizados com sucesso." });
      onClose();
    } catch (err: any) {
      error({ message: err.message });
    }
  };

  if (!systemData || systemData.length === 0) {
    return (
      <EmptyState
        title="Órgãos do Paciente"
        description="Nenhum órgão encontrado."
        icon={<GiHeartOrgan className="w-12 h-12 text-gray-300" />}
      />
    );
  }

  return (
    <>
      <Button variant="outline" color="secondary" onClick={handleOpen}>
        Editar Órgãos
      </Button>

      <Modal
        isOpen={isOpen}
        title="Escolha os órgãos"
        position="top"
        description="Selecione os órgãos que deseja manter ou adicionar ao seu perfil. Se removê-los da seleção, eles serão desconectados."
        onClose={onClose}
        size="2xl"
        onOk={handleSubmit(submitImplementation)}
        buttonsLabel={{
          confirm: "Salvar Alterações",
          cancel: "Cancelar",
        }}
        closeOnOverlayClick={false}
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {systemData.map((organ) => {
            const organIcon = getOrganIcon(organ.slug);
            const isSelected = selectedOrgans.includes(organ.id);

            return (
              <SelectableButton
                key={organ.slug}
                isSelected={isSelected}
                label={organ.name}
                onClick={() => toggleOrganSelection(organ.id)}
                icon={organIcon}
              />
            );
          })}
        </div>
      </Modal>
    </>
  );
};
