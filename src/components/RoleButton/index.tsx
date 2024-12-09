import { RolePatientEnum } from "@/contexts/AuthContext";
import { HeartIcon } from "@heroicons/react/16/solid";
import { GiftIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface RoleButtonProps {
  role: RolePatientEnum;
  selectedRole?: any;
  onSelect: (role: RolePatientEnum) => void;
}

const RoleButton: React.FC<RoleButtonProps> = ({
  role,
  selectedRole,
  onSelect,
}) => {
  const isSelected = selectedRole === role;
  const label = role === RolePatientEnum.DONOR ? "Doador" : "Receptor";

  return (
    <button
      type="button"
      onClick={() => onSelect(role)}
      className={`flex flex-col items-center justify-center w-44 h-24 mx-auto rounded-lg border-2 ${
        isSelected
          ? "border-primary-default bg-primary-100"
          : "border-gray-300 bg-gray-100"
      }`}
    >
      {role === RolePatientEnum.DONOR ? (
        <HeartIcon
          className={clsx("w-8 h-8", {
            "text-primary-default": isSelected,
            "text-secondary-default": !isSelected,
          })}
        />
      ) : (
        <GiftIcon
          className={clsx("w-8 h-8", {
            "text-primary-default": isSelected,
            "text-secondary-default": !isSelected,
          })}
        />
      )}

      <span
        className={`mt-2 text-sm ${
          isSelected ? "text-primary-default font-semibold" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default RoleButton;
