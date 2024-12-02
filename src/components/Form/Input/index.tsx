import { forwardRef, ForwardRefRenderFunction, ReactNode } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: Partial<FieldError>;
  inputLeftAddons?: ReactNode | string;
  inputRightAddons?: ReactNode | string;
  colorLabel?: string;
  fontWeightLabel?: string;
  isRequired?: boolean;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    name,
    label,
    error = null,
    inputLeftAddons,
    inputRightAddons,
    colorLabel = "text-gray-900",
    fontWeightLabel = "font-medium",
    isRequired = false,
    ...rest
  },
  ref
) => {
  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex items-center">
        {inputLeftAddons && (
          <div className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
            {inputLeftAddons}
          </div>
        )}
        <input
          id={name}
          name={name}
          ref={ref}
          aria-required={isRequired}
          required={isRequired}
          className={`block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary-default sm:text-sm sm:leading-6 ${
            inputLeftAddons ? "rounded-l-none" : ""
          } ${inputRightAddons ? "rounded-r-none" : ""}`}
          {...rest}
        />
        {inputRightAddons && (
          <div className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-l-0 border-gray-300 rounded-r-md">
            {inputRightAddons}
          </div>
        )}
      </div>
      {error?.message && (
        <p className="mt-1.5 ml-3 text-xs text-error-default" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

const Input = forwardRef(InputBase);
export default Input;
