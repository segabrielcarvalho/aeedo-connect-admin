import UserProfile from "@/components/UserInfo";
import getRoles from "@/utils/getRole";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { User } from "../dto";

export const adminColumns = [
  {
    header: "Usuário",
    render: (user: User) => (
      <UserProfile
        name={user.name}
        email={user.email}
        avatarUrl={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name}`}
      />
    ),
    alwaysVisible: true,
  },
  {
    header: "Tipo",
    render: (user: User) => (
      <span className="text-gray-600 text-sm font-light">
        {getRoles(user.role)}
      </span>
    ),
  },
  {
    header: "Criado em",
    render: (user: User) => (
      <div className="flex flex-col">
        <span className="text-gray-600 text-sm font-light">
          {moment(user.createdAt).format("DD/MM/YYYY")}
        </span>
        <span className="text-gray-600 text-sm font-light">
          {moment(user.createdAt).fromNow()}
        </span>
      </div>
    ),
  },
];

export const generalColumns = [
  {
    header: "Usuário",
    render: (user: User) => (
      <UserProfile
        name={user.name}
        email={user.email}
        avatarUrl={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name}`}
      />
    ),
    alwaysVisible: true,
  },
  {
    header: "Tipo",
    render: (user: User) => (
      <span className="text-gray-600 text-sm font-light">{user.role}</span>
    ),
  },
  {
    header: "Documento",
    render: (user: User) => (
      <span className="text-gray-600 text-sm font-light">
        {user.document || "-"}
      </span>
    ),
  },
  {
    header: "Nascimento",
    render: (user: User) => (
      <span className="text-gray-600 text-sm font-light">
        {user.birthDate || "-"}
      </span>
    ),
  },
  {
    header: "Ativo",
    render: (user: User) => (
      <span>
        {user.isActive ? (
          <CheckCircleIcon
            aria-hidden="true"
            className="text-green-500 h-6 w-6"
          />
        ) : (
          <XMarkIcon className="text-red-500 h-6 w-6" aria-hidden="true" />
        )}
      </span>
    ),
  },
];
