"use client";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DesktopSideBar from "./DesktopSideBar";
import MobileSideBar from "./MobileSideBar";

const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <MobileSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <DesktopSideBar />

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        >
          <span className="sr-only">Abrir Barra Lateral</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-gray-900">
          Dashboard
        </div>
        <a href="#">
          <span className="sr-only">Meu Perfil</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="size-8 rounded-full bg-gray-50"
          />
        </a>
      </div>
    </>
  );
};

export default SideBar;
