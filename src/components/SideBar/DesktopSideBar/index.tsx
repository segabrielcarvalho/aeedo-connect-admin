"use client";
import { Logo } from "@/components/Logo";
import { useAuthContext } from "@/contexts/AuthContext";
import classNames from "@/utils/classnames";
import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { TbLogout2 } from "react-icons/tb";
import routes from "../../../routes";
import Can from "../../Can";
import { navigation, secondaryNavigation } from "../constants";

const DesktopSideBar = () => {
  const { user, signOut } = useAuthContext();
  const pathname = usePathname();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-10 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Logo className="h-8 mt-5 w-auto" />
        <nav aria-label="Sidebar" className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isCurrent = pathname.startsWith(item.href);
                  return (
                    <Can key={item.name} roles={item.roles}>
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            isCurrent
                              ? "bg-gray-100 text-secondary-600"
                              : "text-gray-700 hover:bg-gray-100 hover:text-secondary-600",
                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className={classNames(
                              isCurrent
                                ? "text-secondary-600"
                                : "text-gray-400 group-hover:text-secondary-600",
                              "size-6 shrink-0"
                            )}
                          />
                          {item.name}
                          {item.count ? (
                            <span
                              aria-hidden="true"
                              className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-gray-50 px-2.5 py-0.5 text-center text-xs/5 font-medium text-gray-600 ring-1 ring-inset ring-gray-200"
                            >
                              {item.count}
                            </span>
                          ) : null}
                        </a>
                      </li>
                    </Can>
                  );
                })}
              </ul>
            </li>
            <li>
              <div className="text-xs/6 font-semibold text-gray-400">
                Links Úteis
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {secondaryNavigation.map((item) => {
                  const isCurrent = pathname.startsWith(item.href);
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classNames(
                          isCurrent
                            ? "bg-gray-50 text-secondary-600"
                            : "text-gray-700 hover:bg-gray-100 hover:text-secondary-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <span
                          className={classNames(
                            isCurrent
                              ? "border-secondary-600 text-secondary-600"
                              : "border-gray-200 text-gray-400 group-hover:border-secondary-600 group-hover:text-secondary-600",
                            "flex size-6 shrink-0 items-center justify-center rounded-lg border bg-white text-[0.625rem] font-medium"
                          )}
                        >
                          {item.initial}
                        </span>
                        <span className="truncate">{item.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>

        <div className="mb-10">
          <NextLink
            href={routes.dashboard.me.path}
            className="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold items-center"
          >
            <Image
              alt=""
              width={40}
              height={40}
              src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${user?.name}}`}
              className="inline-block size-10 rounded-full"
            />
            {user?.name}
          </NextLink>

          <span
            onClick={signOut}
            className={classNames(
              "text-gray-700 hover:bg-gray-100 hover:text-primary-default",
              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold cursor-pointer"
            )}
          >
            <TbLogout2 className="text-gray-400 group-hover:text-primary-default size-6 shrink-0" />
            Sair
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesktopSideBar;
