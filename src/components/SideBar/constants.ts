import {
  BuildingStorefrontIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import routes from "../../routes";

interface NavigationItem {
  current: any;
  name: string;
  href: string;
  count?: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const navigation: NavigationItem[] = [
  {
    name: "Usuários",
    href: routes.dashboard.users.path,
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Hospitais",
    href: routes.dashboard.hospitals.path,
    icon: BuildingStorefrontIcon,
    current: false,
  },
  {
    name: "Órgãos",
    href: "/dashboard/orgaos",
    icon: HeartIcon,
    current: false,
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
