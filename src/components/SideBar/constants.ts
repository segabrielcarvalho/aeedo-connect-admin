import {
  ArrowTopRightOnSquareIcon,
  BuildingStorefrontIcon,
  CodeBracketIcon,
  HeartIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import routes from "../../routes";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const navigation: NavigationItem[] = [
  { name: "Usuários", href: routes.dashboard.users.path, icon: UsersIcon },
  {
    name: "Hospitais",
    href: "#",
    icon: BuildingStorefrontIcon,
  },
  {
    name: "Órgãos",
    href: "#",
    icon: HeartIcon,
  },
  {
    name: "Site Institucional",
    href: "#",
    icon: ArrowTopRightOnSquareIcon,
  },
  {
    name: "Documentação",
    href: "#",
    icon: ArrowTopRightOnSquareIcon,
  },
  {
    name: "GitHub",
    href: "#",
    icon: CodeBracketIcon,
  },
];
