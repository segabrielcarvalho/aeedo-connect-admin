import clsx from "clsx";
import Link from "next/link";

const baseStyles = {
  solid:
    "group inline-flex items-center justify-center rounded-md py-2 px-4 text-sm font-normal focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2",
  outline:
    "group inline-flex ring-1 items-center justify-center rounded-md py-2 px-4 text-sm focus:outline-none",
  unstyled: "inline-flex items-center text-sm font-semibold",
};

const variantStyles = {
  solid: {
    primary:
      "bg-primary-default text-white hover:bg-primary-400 active:bg-primary-500 focus-visible:outline-primary-default text-[0.84rem]",
    secondary:
      "bg-secondary-default text-white hover:bg-gray-700 active:bg-gray-700 focus-visible:outline-gray-700 text-[0.84rem] px-8",
    error:
      "bg-error-default text-white hover:bg-error-400 active:bg-error-500 focus-visible:outline-error-default text-[0.84rem]",
    success:
      "bg-success-default text-white hover:bg-success-400 active:bg-success-500 focus-visible:outline-success-default text-[0.84rem]",
    warn: "bg-warn-default text-white hover:bg-warn-400 active:bg-warn-500 focus-visible:outline-warn-default text-[0.84rem]",
  },
  outline: {
    primary:
      "ring-primary-default text-primary-default hover:ring-primary-400 active:ring-primary-500 focus-visible:outline-primary-default text-[0.84rem]",
    secondary:
      "ring-secondary-default text-secondary-default hover:ring-secondary-400 active:ring-secondary-500 focus-visible:outline-secondary-default text-[0.84rem] px-8 hover:bg-gray-100",
    error:
      "ring-error-default text-error-default hover:ring-error-400 active:ring-error-500 focus-visible:outline-error-default text-[0.84rem]",
    success:
      "ring-success-default text-success-default hover:ring-success-400 active:ring-success-500 focus-visible:outline-success-default text-[0.84rem]",
    warn: "ring-warn-default text-warn-default hover:ring-warn-400 active:ring-warn-500 focus-visible:outline-warn-default text-[0.84rem]",
  },
  unstyled: {
    primary: "text-primary-default hover:text-primary-400",
    secondary: "text-secondary-default hover:text-secondary-400",
    error: "text-error-default hover:text-error-400",
    success: "text-success-default hover:text-success-400",
    warn: "text-warn-default hover:text-warn-400",
  },
};

type ButtonProps = (
  | {
      variant?: "solid" | "unstyled";
      color?: keyof typeof variantStyles.solid;
    }
  | {
      variant: "outline";
      color?: keyof typeof variantStyles.outline;
    }
) &
  (
    | Omit<React.ComponentPropsWithoutRef<typeof Link>, "color">
    | (Omit<React.ComponentPropsWithoutRef<"button">, "color"> & {
        href?: undefined;
      })
  ) & {
    isLoading?: boolean;
    isDisabled?: boolean;
  };

export default function Button({
  className,
  isLoading,
  isDisabled,
  children,
  ...props
}: ButtonProps) {
  props.variant ??= "solid";
  props.color ??= "primary";

  const disabled = isLoading || isDisabled;

  className = clsx(
    baseStyles[props.variant],
    props.variant === "outline"
      ? variantStyles.outline[props.color]
      : props.variant === "solid"
      ? variantStyles.solid[props.color]
      : props.variant === "unstyled"
      ? variantStyles.unstyled[props.color]
      : undefined,
    className,
    disabled && "opacity-75 cursor-not-allowed"
  );

  return typeof props.href === "undefined" ? (
    <button className={className} {...props} disabled={disabled}>
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        children
      )}
    </button>
  ) : (
    <Link className={className} {...props}>
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        children
      )}
    </Link>
  );
}
