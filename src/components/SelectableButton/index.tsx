import clsx from "clsx";

interface SelectableButtonProps {
  isSelected: boolean;
  label: string;
  onClick: () => void;
  icon: React.ReactNode;
}

export default function SelectableButton({
  isSelected,
  label,
  onClick,
  icon,
}: SelectableButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "flex flex-col items-center justify-center w-44 h-24 mx-auto rounded-lg border-2",
        isSelected
          ? "border-primary-default bg-primary-100"
          : "border-gray-300 bg-gray-100"
      )}
    >
      {icon}
      <span
        className={clsx(
          "mt-2 text-sm",
          isSelected ? "text-primary-default font-semibold" : "text-gray-500"
        )}
      >
        {label}
      </span>
    </button>
  );
}
