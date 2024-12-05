import {
  ArrowTopRightOnSquareIcon,
  BuildingStorefrontIcon,
  CodeBracketIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import routes from "../../routes";

interface NavigationItem {
  current: any;
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const navigation: NavigationItem[] = [
  { name: "Usuários", href: routes.dashboard.users.path, icon: UsersIcon, current: false },
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
  {
    name: "Site Institucional",
    href: "#",
    icon: ArrowTopRightOnSquareIcon,
    current: false,
  },
  {
    name: "Documentação",
    href: "#",
    icon: ArrowTopRightOnSquareIcon,
    current: false,
  },
  {
    name: "GitHub",
    href: "#",
    icon: CodeBracketIcon,
    current: false,
  },
];
