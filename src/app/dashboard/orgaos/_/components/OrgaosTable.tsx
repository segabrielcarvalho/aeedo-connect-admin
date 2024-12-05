"use client";

import Button from "@/components/Button";
import { Input, TextArea } from "@/components/Form/Input";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { BsLungs } from "react-icons/bs";
import { FaHeart, FaRegEye } from "react-icons/fa";
import {
  GiInternalOrgan,
  GiKidneys,
  GiLiver,
  GiTiedScroll,
  GiValve,
} from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { LuBone, LuBrain } from "react-icons/lu";
import SectionHeading from "../../../../../components/SectionHeading";
import SelectableButton from "../../../../../components/SelectableButton";
import useToastHook from "../../../../../hooks/useToastHook";
import { CreateOrganVariables } from "../dto/index";

interface OrganSectionProps {
  userOrgans: string[];
}

const OrgaosTable: React.FC<OrganSectionProps> = ({ userOrgans }) => {
  const { control, reset, handleSubmit, watch, setValue } =
    useForm<CreateOrganVariables>();

  const organIcons = {
    Coração: <FaHeart className="w-8 h-8 text-red-500" />,
    Pulmão: <BsLungs className="w-8 h-8 text-blue-500" />,
    Rim: <GiKidneys className="w-8 h-8 text-purple-500" />,
    Fígado: <GiLiver className="w-8 h-8 text-orange-500" />,
    Pâncreas: <GiInternalOrgan className="w-8 h-8 text-yellow-500" />,
    Intestino: <GiInternalOrgan className="w-8 h-8 text-green-500" />,
    "Medula Óssea": <LuBrain className="w-8 h-8 text-gray-500" />,
    Córnea: <FaRegEye className="w-8 h-8 text-blue-400" />,
    Pele: <IoWaterOutline className="w-8 h-8 text-pink-400" />,
    Ossos: <LuBone className="w-8 h-8 text-gray-400" />,
    Cartilagem: <BiDetail className="w-8 h-8 text-teal-500" />,
    Tendões: <GiTiedScroll className="w-8 h-8 text-yellow-600" />,
    "Válvulas Cardíacas": <GiValve className="w-8 h-8 text-red-400" />,
  };
  const organsList = Object.keys(organIcons);

  const [selectedOrgans, setSelectedOrgans] = useState<string[]>(userOrgans);

  const router = useRouter();
  const { error, success } = useToastHook();

  const toggleOrganSelection = (organ: string) => {
    setSelectedOrgans((prev) =>
      prev.includes(organ) ? prev.filter((o) => o !== organ) : [...prev, organ]
    );
  };

  const submitImplementation: SubmitHandler<CreateOrganVariables> = async (
    args
  ) => {
    try {
      success({ message: "Usuário criado com sucesso." });
      reset();
      router.push(routes.dashboard.users.path);
    } catch (e) {
      console.error(e);
      error({ message: "Erro ao criar Usuário." });
    }
  };

  return (
    <div>
      <form
        className="space-y-12 w-full"
        onSubmit={handleSubmit(submitImplementation)}
      >
        <SectionHeading title="Órgãos Associados" />
        <div className="grid sm:grid-cols-3 2xl:grid-cols-7 gap-4">
          {organsList.map((organ) => (
            <SelectableButton
              key={organ}
              isSelected={selectedOrgans.includes(organ)}
              label={organ}
              onClick={() => toggleOrganSelection(organ)}
              icon={organIcons[organ as keyof typeof organIcons]}
            />
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-[400px_200px] items-center gap-x-3 md:gap-x-12">
          <Controller
            control={control}
            name="data.name"
            render={({ field: { name, onChange, ref } }) => (
              <TextArea
                ref={ref}
                onChange={onChange}
                label="Órgão"
                name={name}
                isRequired
                value={selectedOrgans.join(", ")}
                isTextArea
              />
            )}
          ></Controller>

          <Controller
            control={control}
            name="data.patientType"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Tipo de Paciente"
                value="Doador"
                name={name}
                isDisabled
              />
            )}
          ></Controller>
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
          >
            Criar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrgaosTable;
