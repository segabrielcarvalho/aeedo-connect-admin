"use client";

import Button from "@/components/Button";
import EmptyState from "@/components/EmptyState";
import Modal from "@/components/Modal";
import SectionHeading from "@/components/SectionHeading";
import SelectableButton from "@/components/SelectableButton";
import { useAxiosMutation } from "@/hooks/useAxiosMutation";
import useDisclosure from "@/hooks/useDisclosure";
import useToastHook from "@/hooks/useToastHook";
import apiRoutes from "@/routes/api";
import { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMeContext } from "../../../Context/MeContext";
import { HospitalField } from "../../HospitalField";

interface ManageHospitalsVariables {
  patient_id: string;
  hospitals: {
    connect: { id: string }[];
    disconnect: { id: string }[];
  };
}

const HospitalSection: React.FC = () => {
  const {
    patientDetails,
    refetchDetails,
    systemHospitals: allHospitals,
  } = useMeContext();
  const { success, error } = useToastHook();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { handleSubmit } = useForm<ManageHospitalsVariables>();

  const [submit] = useAxiosMutation({
    url: apiRoutes.hospitals.choose.path,
    method: apiRoutes.hospitals.choose.method,
  });

  const hospitals = patientDetails?.hospitals || [];

  const [selectedHospitals, setSelectedHospitals] = useState<string[]>([]);

  const handleOpen = useCallback(() => {
    onOpen();
    const initialSelected = hospitals.map((hospital) => hospital.id);
    setSelectedHospitals(initialSelected);
  }, [onOpen, hospitals]);

  const toggleHospitalSelection = (hospitalId: string) => {
    setSelectedHospitals((prev) =>
      prev.includes(hospitalId)
        ? prev.filter((id) => id !== hospitalId)
        : [...prev, hospitalId]
    );
  };

  const submitImplementation: SubmitHandler<
    ManageHospitalsVariables
  > = async () => {
    try {
      const initialSelected = hospitals.map((hospital) => hospital.id);
      const connectIds = selectedHospitals.filter(
        (id) => !initialSelected.includes(id)
      );
      const disconnectIds = initialSelected.filter(
        (id) => !selectedHospitals.includes(id)
      );

      const variables: ManageHospitalsVariables = {
        patient_id: patientDetails?.patient.id || "",
        hospitals: {
          connect: connectIds.map((id) => ({ id })),
          disconnect: disconnectIds.map((id) => ({ id })),
        },
      };

      await submit({ variables });
      refetchDetails();
      success({ message: "Hospitais atualizados com sucesso." });
      onClose();
    } catch (err: any) {
      error({
        message:
          err.response?.data?.message || "Erro ao atualizar os hospitais",
      });
    }
  };

  return (
    <div>
      <SectionHeading
        title="Hospitais"
        description="Gerencie os hospitais vinculados ao seu perfil."
      />

      {hospitals.length > 0 ? (
        <div className="grid gap-4 mt-6">
          {hospitals.map((hospital) => (
            <HospitalField key={hospital.id} hospital={hospital} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Nenhum hospital encontrado"
          description="Vincule um hospital ao seu perfil para começar."
        />
      )}

      <Button
        className="w-full mt-6"
        color="primary"
        variant="unstyled"
        onClick={handleOpen}
      >
        {hospitals.length > 0
          ? "+ Vincular Novo Hospital"
          : "+ Adicionar Hospital"}
      </Button>

      <Modal
        isOpen={isOpen}
        title="Gerenciar Hospitais"
        position="top"
        description="Selecione os hospitais que deseja vincular ao seu perfil."
        onClose={onClose}
        size="lg"
        onOk={handleSubmit(submitImplementation)}
        buttonsLabel={{
          confirm: "Salvar Alterações",
          cancel: "Cancelar",
        }}
        closeOnOverlayClick={false}
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {allHospitals?.map((hospital) => {
            const isSelected = selectedHospitals.includes(hospital.id);

            return (
              <SelectableButton
                key={hospital.id}
                icon="hospital"
                isSelected={isSelected}
                label={hospital.name}
                onClick={() => toggleHospitalSelection(hospital.id)}
              />
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default HospitalSection;
