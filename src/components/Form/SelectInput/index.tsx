"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

interface Option<T> {
  value: T;
  label: string;
}

interface SelectInputProps<T> {
  name: string;
  label: string;
  options: Option<T>[];
  value?: T;
  onChange?: (value: T) => void;
  error?: string;
  isRequired?: boolean;
  placeholder?: string;
  menuPosition?: "top" | "bottom";
  colorLabel?: string;
  fontWeightLabel?: string;
}

const SelectInput = <T,>({
  name,
  label,
  options,
  value,
  onChange,
  error,
  isRequired = false,
  placeholder = "Selecione uma opção",
  menuPosition = "bottom",
  colorLabel = "text-gray-900",
  fontWeightLabel = "font-medium",
}: SelectInputProps<T>) => {
  const [selected, setSelected] = useState<Option<T> | undefined>(
    options.find((option) => option.value === value)
  );

  const handleChange = (option: Option<T>) => {
    setSelected(option);
    if (onChange) onChange(option.value);
  };

  const positionClasses =
    menuPosition === "top" ? "bottom-full mb-2" : "top-full mt-2";

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className={`block text-sm ${fontWeightLabel} ${colorLabel}`}
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative ">
          <ListboxButton
            className={`relative w-full cursor-default rounded-md bg-white py-2.5 mt-1 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm`}
          >
            <span className="block truncate">
              {selected?.label || placeholder}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              />
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={`absolute z-10 ${positionClasses} max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm`}
            >
              {options.map((option) => (
                <ListboxOption
                  key={String(option.value)}
                  value={option}
                  className={({ active, selected }) =>
                    `relative select-none py-2 pl-8 pr-4 cursor-pointer ${
                      active
                        ? "bg-primary-600 text-white"
                        : selected
                        ? "font-semibold text-gray-900"
                        : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-semibold" : "font-normal"
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                          <CheckIcon aria-hidden="true" className="h-5 w-5" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default SelectInput;
