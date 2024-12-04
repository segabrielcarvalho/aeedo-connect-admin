import SectionHeading from "../../../../../../../components/SectionHeading";
import { MeProfileProps } from "../../../../../../../components/UserInfo/index";

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

export const ProfileSection: React.FC = () => (
  <>
    <div className="px-4 sm:px-0">
      <SectionHeading title="Informações Pessoais" />
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
  </>
);
