"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Button from "../Button";

type AlertType = "error" | "warn" | "info" | "success";

interface AlertProps {
  title: string;
  description: string;
  type?: AlertType;
  confirmButton: {
    label?: string;
    loading?: boolean;
    onConfirm: () => void;
  };
  disclosure: { isOpen: boolean; onClose: () => void };
}

const icons = {
  error: ExclamationTriangleIcon,
  warn: ExclamationTriangleIcon,
  info: InformationCircleIcon,
  success: CheckCircleIcon,
};

const colors = {
  error: "bg-red-100 text-red-600",
  warn: "bg-yellow-100 text-yellow-600",
  info: "bg-blue-100 text-blue-600",
  success: "bg-green-100 text-green-600",
};

export default function Alert({
  title,
  description,
  type = "info",
  disclosure,
  confirmButton: { label: buttonLabel, onConfirm, loading },
}: AlertProps) {
  const { isOpen, onClose } = disclosure;

  const Icon = icons[type];
  const colorClasses = colors[type];

  return (
    <Fragment>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${colorClasses} sm:mx-0 sm:h-10 sm:w-10`}
                  >
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2 space-x-2">
                <Button
                  color="secondary"
                  type="button"
                  variant="solid"
                  onClick={onConfirm}
                  isLoading={loading}
                >
                  {buttonLabel || "Confirmar"}
                </Button>
                <Button
                  type="button"
                  data-autofocus
                  onClick={onClose}
                  variant="outline"
                  color="primary"
                >
                  Cancelar
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Fragment>
  );
}
