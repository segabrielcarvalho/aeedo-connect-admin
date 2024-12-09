"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import SectionHeading from "@/components/SectionHeading";
import useToastHook from "@/hooks/useToastHook";
import routes from "@/routes";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BiDetail } from "react-icons/bi";
import { BsLungs } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import {
  GiInternalOrgan,
  GiKidneys,
  GiLiver,
  GiTiedScroll,
  GiValve,
} from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { LuBone, LuBrain } from "react-icons/lu";
import {
  CreateHospitalAddressVariables,
  CreateHospitalVariables,
} from "./_/dto";

const CreateHospitalPage: React.FC = () => {
  const router = useRouter();
  const { error, success } = useToastHook();
  const { control, reset, handleSubmit, watch, setValue } = useForm<
    CreateHospitalVariables & CreateHospitalAddressVariables
  >();

  let data: CreateHospitalVariables & CreateHospitalAddressVariables = {
    data: {
      name: "",
      email: "",
      phone: "",
      cnpj: "",
      password: "",
      zipCode: "",
      street: "",
      neighborhood: "",
      houseNumber: "",
      complement: "",
      city: "",
      state: "",
    },
  };

  const submitImplementation: SubmitHandler<
    CreateHospitalVariables & CreateHospitalAddressVariables
  > = async (args) => {
    try {
      success({ message: "Hospital criado com sucesso." });
      reset();
      router.push(routes.dashboard.users.path);
    } catch (e) {
      console.error(e);
      error({ message: "Erro ao criar Hospital." });
    }
  };

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
            name="data.name"
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
            name="data.phone"
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
            name="data.cnpj"
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

        <div className="grid col-start-2 gap-y-6">
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
        </div>

        <div className="grid col-start-3 gap-y-6">
          <Input
            name="confirmPassword"
            type="password"
            label="Confirmar Senha"
            placeholder="Digite uma senha"
            isRequired
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
        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="data.zipCode"
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
            name="data.street"
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
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="data.neighborhood"
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
            name="data.houseNumber"
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

        <div className="grid col-start-2 gap-y-6">
          <Controller
            control={control}
            name="data.complement"
            render={({ field: { name, onChange, ref } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                label="Complemento"
                placeholder='Ex: "Próximo ao mercado"'
                name={name}
                isRequired
              />
            )}
          />

          <Input
            name="data.city"
            label="Cidade"
            placeholder='Ex: "São Paulo"'
            isRequired
          />
        </div>

        <div>
          <Input
            name="data.state"
            label="Estado"
            placeholder='Ex: "Goiás"'
            isRequired
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
        >
          Criar
        </Button>
      </div>
    </form>
  );
};

export default CreateHospitalPage;
