"use client";

import Button from "@/components/Button";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";

type DropdownProps = {
  label: string;
  children: React.ReactNode;
};

export default function Dropdown({ label, children }: DropdownProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton
        as={Button}
        color="secondary"
        variant="outline"
        className="inline-flex w-full justify-center gap-x-1.5 text-sm font-semibold text-gray-900"
      >
        {label}
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-96 origin-top-right p-5
          divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 
          focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 
          data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}
