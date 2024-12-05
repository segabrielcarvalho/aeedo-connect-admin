"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import SectionHeading from "@/components/SectionHeading";
import SelectableButton from "@/components/SelectableButton";
import useToastHook from "@/hooks/useToastHook";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { BsLungs } from "react-icons/bs";
import {
  FaHandHoldingHeart,
  FaRegEye,
  FaRegHandshake,
  FaRegUser,
} from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import {
  GiInternalOrgan,
  GiKidneys,
  GiLiver,
  GiTiedScroll,
  GiValve,
} from "react-icons/gi";
import { GrUserAdmin } from "react-icons/gr";
import { IoWaterOutline } from "react-icons/io5";
import { LuBone, LuBrain } from "react-icons/lu";
import { CreateUserVariables } from "./_/dto";

const CreateUserPage: React.FC = () => {
  const router = useRouter();
  const { error, success } = useToastHook();
  const { control, reset, handleSubmit, watch, setValue } =
    useForm<CreateUserVariables>();

  const role = watch("data.role");
  const patientType = watch("data.patientType");
  const selectedOrgans = watch("data.organs") || [];

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

  const toggleOrganSelection = (organ: string) => {
    setValue(
      "data.organs",
      selectedOrgans.includes(organ)
        ? selectedOrgans.filter((o) => o !== organ)
        : [...selectedOrgans, organ]
    );
  };

  const submitImplementation: SubmitHandler<CreateUserVariables> = async (
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
            name="data.name"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Nome Completo"
                placeholder='Ex: "Maria Silva"'
                name={name}
                isRequired
              />
            )}
          />

          <Controller
            control={control}
            name="data.email"
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
            name="data.password"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                type="password"
                label="Senha"
                placeholder="Digite uma senha"
                name={name}
                isRequired
              />
            )}
          />

          <Input
            name="confirmPassword"
            type="password"
            label="Senha"
            placeholder="Digite uma senha"
            isRequired
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
            onClick={() => setValue("data.role", "admin")}
            icon={<GrUserAdmin className="w-7 h-7 font-thin" />}
          />
          <SelectableButton
            isSelected={role === "user"}
            label="Usuário"
            onClick={() => setValue("data.role", "user")}
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

            <div className="grid grid-cols-7 gap-4">
              <SelectableButton
                isSelected={patientType === "doador"}
                label="Doador"
                onClick={() => setValue("data.patientType", "doador")}
                icon={<FaHandHoldingHeart className="w-8 h-8" />}
              />
              <SelectableButton
                isSelected={patientType === "receptor"}
                label="Receptor"
                onClick={() => setValue("data.patientType", "receptor")}
                icon={<FaRegHandshake className="w-8 h-8" />}
              />
            </div>
          </div>

          {patientType && (
            <div className="grid grid-cols-1 gap-8">
              <SectionHeading
                title="Seleção de Órgãos"
                description="Escolha os órgãos associados ao paciente."
              />
              <div className="grid grid-cols-7 gap-4">
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
            </div>
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
        >
          Criar
        </Button>
      </div>
    </form>
  );
};

export default CreateUserPage;
