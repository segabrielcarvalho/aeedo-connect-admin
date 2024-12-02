"use client";
import { Logo } from "@/components/Logo";
import { useAuthContext } from "@/contexts/AuthContext";
import classNames from "@/utils/classnames";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { navigation } from "../constants";

const DesktopSideBar = () => {
  const { user } = useAuthContext();
  console.log(user);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-10 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Logo className="h-8 mt-5 w-auto" />
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={classNames(
                        "text-gray-700 hover:bg-gray-50 hover:text-secondary-600",
                        "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={classNames(
                          "text-gray-400 group-hover:text-secondary-600",
                          "size-6 shrink-0"
                        )}
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
            <li className="-mx-6 mt-auto mb-16">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-50"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-50"
                />
                <span className="sr-only">{user?.name}</span>
                <span aria-hidden="true">{user?.name}</span>
              </a>

              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold  hover:bg-gray-50 text-gray-400 hover:text-primary-default"
              >
                <ArrowLeftStartOnRectangleIcon
                  aria-hidden="true"
                  className="size-6 shrink-0  group-hover:text-primary-default hover:text-primary-default"
                />
                Sair
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSideBar;
