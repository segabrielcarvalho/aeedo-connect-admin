import CustomToast from "@/components/CustomToast";
import { Slide, ToastOptions, toast } from "react-toastify";

export type IToast = { message: string; description?: string };

export const toastConfig: ToastOptions = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  progress: undefined,
  closeButton: false,
  theme: "colored",
  transition: Slide,
  className: "animate__animated animate__fadeIn  p-0 m-0",
};

const useToastHook = () => {
  const showToast = (
    type: "success" | "error" | "info" | "warning",
    { message, description }: IToast
  ) => {
    toast(
      ({ closeToast }) => (
        <CustomToast
          message={message}
          description={description}
          type={type}
          onClose={closeToast}
        />
      ),
      toastConfig
    );
  };

  return {
    info: (props: IToast) => showToast("info", props),
    warn: (props: IToast) => showToast("warning", props),
    success: (props: IToast) => showToast("success", props),
    error: (props: IToast) => showToast("error", props),
  };
};

export default useToastHook;
