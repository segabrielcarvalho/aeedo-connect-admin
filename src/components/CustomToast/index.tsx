import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface CustomToastProps {
  message: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const iconMap = {
  success: <CheckCircleIcon className="h-6 w-6 text-green-400" />,
  error: <ExclamationCircleIcon className="h-6 w-6 text-red-400" />,
  info: <CheckCircleIcon className="h-6 w-6 text-blue-400" />,
  warning: <ExclamationCircleIcon className="h-6 w-6 text-yellow-400" />,
};

const CustomToast: React.FC<CustomToastProps> = ({
  message,
  description,
  type,
  onClose,
}) => {
  return (
    <div className="pointer-events-auto w-full flex-1 max-w-xl overflow-hidden rounded-lg bg-white">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">{iconMap[type]}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{message}</p>
            {description && (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            )}
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Fechar</span>
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToast;
