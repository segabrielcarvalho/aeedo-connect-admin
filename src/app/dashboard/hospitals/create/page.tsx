"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import SectionHeading from "@/components/SectionHeading";
import useToastHook from "@/hooks/useToastHook";
import routes from "@/routes";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useAxiosMutation } from "../../../../hooks/useAxiosMutation";
import apiRoutes from "../../../../routes/api";
import {
  CreateHospitalAddressVariables,
  CreateHospitalResponse,
  CreateHospitalVariables,
  createHospitalSchema,
} from "./_/dto";

const CreateHospitalPage: React.FC = () => {
  const router = useRouter();
  const { error, success } = useToastHook();

  const [submit, { loading }] = useAxiosMutation<
    CreateHospitalResponse,
    CreateHospitalVariables & CreateHospitalAddressVariables
  >({
    url: apiRoutes.hospitals.admin.create.path,
    method: apiRoutes.hospitals.admin.create.method,
  });

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateHospitalVariables>({
    resolver: zodResolver(createHospitalSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cnpj: "",
      password: "",
      confirmPassword: "",
      address: {
        city: "",
        state: "",
        zipCode: "",
        street: "",
        neighborhood: "",
        houseNumber: "",
        complement: "",
      },
    },
  });

  const submitImplementation: SubmitHandler<
    CreateHospitalVariables & CreateHospitalAddressVariables
  > = async (args) => {
    try {
      await submit({ variables: args });
      success({ message: "Hospital criado com sucesso." });
      reset();
      router.push(routes.dashboard.hospitals.path);
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
            name="name"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Nome da Instituição"
                placeholder='Ex: "Hospital São Paulo"'
                name={name}
                isRequired
                error={errors?.name}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Email"
                placeholder='Ex: "user@user.com"'
                name={name}
                isRequired
                error={errors?.email}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="phone"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Telefone"
                placeholder='Ex: "(11) 99999-9999"'
                name={name}
                isRequired
                error={errors?.phone}
              />
            )}
          />

          <Controller
            control={control}
            name="cnpj"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="CNPJ"
                placeholder="Insira seu CNPJ"
                name={name}
                isRequired
                error={errors?.cnpj}
              />
            )}
          />
        </div>

        <div className="grid col-start-2 gap-y-6">
          <Controller
            control={control}
            name="password"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                type="password"
                label="Senha"
                placeholder="Digite uma senha"
                name={name}
                isRequired
                error={errors?.password}
              />
            )}
          />
        </div>

        <div className="grid col-start-3 gap-y-6">
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                type="password"
                label="Confirmar Senha"
                placeholder="Confirme sua senha"
                name={name}
                isRequired
                error={errors?.confirmPassword}
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
        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="address.zipCode"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Caixa Postal"
                placeholder="CEP"
                name={name}
                isRequired
                error={errors?.address?.zipCode}
              />
            )}
          />

          <Controller
            control={control}
            name="address.street"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Rua"
                placeholder='Ex: "Rua Oscar Niemeyer"'
                name={name}
                isRequired
                error={errors?.address?.street}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-y-6">
          <Controller
            control={control}
            name="address.neighborhood"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Bairro"
                placeholder='Ex: "Av. Filostro"'
                name={name}
                isRequired
                error={errors?.address?.neighborhood}
              />
            )}
          />

          <Controller
            control={control}
            name="address.houseNumber"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Número"
                placeholder='Ex: "90"'
                name={name}
                isRequired
                error={errors?.address?.houseNumber}
              />
            )}
          />
        </div>

        <div className="grid col-start-2 gap-y-6">
          <Controller
            control={control}
            name="address.complement"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Complemento"
                placeholder='Ex: "Próximo ao mercado"'
                name={name}
                isRequired
                error={errors?.address?.complement}
              />
            )}
          />

          <Controller
            control={control}
            name="address.city"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Cidade"
                placeholder='Ex: "São Paulo"'
                name={name}
                isRequired
                error={errors?.address?.city}
              />
            )}
          />
        </div>

        <div>
          <Controller
            control={control}
            name="address.state"
            render={({ field: { name, onChange, ref, value } }) => (
              <Input
                ref={ref}
                onChange={onChange}
                value={value}
                label="Estado"
                placeholder='Ex: "Goiás"'
                name={name}
                isRequired
                error={errors?.address?.state}
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
          onClick={() => router.push(routes.dashboard.hospitals.path)}
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

export default CreateHospitalPage;
