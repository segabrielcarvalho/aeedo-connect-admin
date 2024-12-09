"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import Button from "../Button";

interface ModalProps {
  title?: string;
  customFooter?: ReactNode;
  image?: ReactNode;
  children: ReactNode;
  onOk?: () => void;
  onClose?: () => void;
  isOpen: boolean;
  showCloseButton?: boolean;
  imageColor?: "success" | "error" | "warning" | "info";
  description?: string;
  buttonsLabel?: {
    cancel: string;
    confirm: string;
  };
  closeOnOverlayClick?: boolean;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
  position?: "center" | "top" | "bottom" | "left" | "right";
}

const sizeClasses: Record<string, string> = {
  xs: "sm:max-w-xs sm:min-w-xs",
  sm: "sm:max-w-sm sm:min-w-sm",
  md: "sm:max-w-md sm:min-w-md",
  lg: "sm:max-w-lg sm:min-w-lg",
  xl: "sm:max-w-xl sm:min-w-xl",
  "2xl": "sm:max-w-2xl sm:min-w-2xl",
  "3xl": "sm:max-w-3xl sm:min-w-3xl",
  "4xl": "sm:max-w-4xl sm:min-w-4xl",
  "5xl": "sm:max-w-5xl sm:min-w-5xl",
  "6xl": "sm:max-w-6xl sm:min-w-6xl",
  "7xl": "sm:max-w-7xl sm:min-w-7xl",
  full: "sm:max-w-full sm:min-w-full",
};

const positionClasses: Record<string, string> = {
  center: "items-center justify-center",
  top: "items-start justify-center",
  bottom: "items-end justify-center",
  left: "items-center justify-start",
  right: "items-center justify-end",
};

const Modal = ({
  title = "Informação",
  customFooter,
  image,
  children,
  onOk,
  onClose,
  isOpen,
  size = "md",
  buttonsLabel,
  imageColor = "info",
  description,
  closeOnOverlayClick = true,
  position = "center",
}: ModalProps) => {
  const handleClose = () => {
    if (closeOnOverlayClick && onClose) onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <DialogBackdrop className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" />

      <div
        className={clsx(
          "fixed inset-0 z-50 flex p-4",
          positionClasses[position]
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <DialogPanel
            className={`relative max-h-full w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 ${sizeClasses[size]}`}
          >
            <div className="flex flex-col h-full">
              <div className="bg-white px-6 py-5 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  {image && (
                    <div
                      className={clsx(
                        "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10",
                        imageColor === "success" && "bg-green-100",
                        imageColor === "error" && "bg-red-100",
                        imageColor === "warning" && "bg-yellow-100",
                        imageColor === "info" && "bg-blue-100"
                      )}
                    >
                      {typeof image === "string" ? (
                        <Image
                          src={image}
                          alt="Imagem descritiva sobre o modal"
                          className="h-6 w-6"
                          width={48}
                          height={48}
                        />
                      ) : (
                        image
                      )}
                    </div>
                  )}

                  <div className="flex-grow mx-auto flex flex-col space-y-1">
                    <DialogTitle
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900"
                    >
                      {title}
                    </DialogTitle>

                    {description && (
                      <p className="text-sm text-gray-500">{description}</p>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="flex-grow overflow-y-auto px-6 py-4"
                style={{ maxHeight: "calc(100vh - 250px)" }}
              >
                {children}
              </div>

              <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
                {customFooter ? (
                  customFooter
                ) : (
                  <>
                    <Button
                      className="rounded-md"
                      type="button"
                      variant="outline"
                      color="primary"
                      onClick={onClose}
                    >
                      {buttonsLabel?.cancel || "Cancelar"}
                    </Button>
                    <Button
                      className="rounded-md px-5"
                      type="button"
                      variant="solid"
                      color="secondary"
                      onClick={onOk || onClose}
                    >
                      {buttonsLabel?.confirm || "Confirmar"}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </DialogPanel>
        </motion.div>
      </div>
    </Dialog>
  );
};

export default Modal;
