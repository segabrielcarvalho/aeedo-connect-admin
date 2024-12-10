import {
  BuildingStorefrontIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { RoleEnum } from "../../contexts/AuthContext";
import routes from "../../routes";

interface NavigationItem {
  current: any;
  name: string;
  href: string;
  count?: number;
  roles: RoleEnum[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const navigation: NavigationItem[] = [
  {
    name: "Usuários",
    href: routes.dashboard.users.path,
    icon: UsersIcon,
    current: false,
    roles: [RoleEnum.ADMIN],
  },
  {
    name: "Hospitais",
    href: routes.dashboard.hospitals.path,
    icon: BuildingStorefrontIcon,
    current: false,
    roles: [RoleEnum.ADMIN],
  },
  {
    name: "Órgãos",
    href: routes.dashboard.organs.path,
    icon: HeartIcon,
    current: false,
    roles: [RoleEnum.ADMIN, RoleEnum.USER],
  },
];

export const secondaryNavigation = [
  {
    name: "Site Institucional",
    href: "http://localhost:3001",
    initial: "W",
    current: false,
  },
  {
    name: "Documentação",
    href: "http://localhost:3001",
    initial: "D",
    current: false,
  },
  {
    name: "GitHub",
    href: "https://github.com/segabrielcarvalho/aeedo-connect",
    initial: "G",
    current: false,
  },
];
