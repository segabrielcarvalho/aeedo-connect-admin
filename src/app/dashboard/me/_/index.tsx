"use client";

import SelectableButton from "@/components/SelectableButton";
import { useForm } from "react-hook-form";
import { MeProfileProps } from "../../../../components/UserInfo/index";
import { organIcons } from "./components/Sections/OrganSection";

export function ShowUser() {
  const { watch, setValue } = useForm();
  const organsList = Object.keys(organIcons);
  const selectedOrgans = watch("data.organs") || [];
  const toggleOrganSelection = (organ: string) => {
    setValue(
      "data.organs",
      selectedOrgans.includes(organ)
        ? selectedOrgans.filter((o) => o !== organ)
        : [...selectedOrgans, organ]
    );
  };

  const user: MeProfileProps[] = [
    {
      name: "Filipe Miguel",
      role: "Administrador",
      email: "filipe@example.com",
      document: 12345678111,
      birthdate: "1990-01-01",
      type: "doador",
      active: true ? "Sim" : "Não",
      created_at: "2021-01-01",
    },
  ];

  const labels: { [key in keyof MeProfileProps]: string } = {
    name: "Nome Completo",
    role: "Função",
    email: "Email",
    document: "Documento",
    birthdate: "Data de Nascimento",
    type: "Tipo",
    active: "Ativo",
    created_at: "Criado em",
  };

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      {user.map((item, index) => (
        <div key={index} className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            {Object.entries(item).map(([key, value]) => (
              <div
                key={key}
                className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
              >
                <dt className="text-sm/6 font-medium text-gray-900">
                  {labels[key as keyof MeProfileProps]}
                </dt>
                <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="grow">{value.toString()}</span>
                  <span className="ml-4 shrink-0">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Atualizar
                    </button>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
      <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-[1fr_2fr] sm:gap-4 sm:px-0">
        <dt className="text-xl font-medium text-gray-900">
          Órgãos Associados
        </dt>
        <dd className="mt-1 text-sm/6 text-gray-700 sm:mt-0">
          <ul
            role="list"
            className="divide-y divide-gray-100 rounded-md border border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {organsList.map((organ) => (
              <li className="flex py-4 text-sm/6 ">
                <div className="flex w-0 flex-1 items-center justify-center ">
                  <div className=" flex min-w-0 gap-2">
                    <SelectableButton
                      key={organ}
                      isSelected={selectedOrgans.includes(organ)}
                      label={organ}
                      onClick={() => toggleOrganSelection(organ)}
                      icon={organIcons[organ as keyof typeof organIcons]}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </dd>
      </div>
    </>
  );
}
