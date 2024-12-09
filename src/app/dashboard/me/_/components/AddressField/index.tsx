import Button from "@/components/Button";

interface AddressItemProps {
  zipCode: string;
  street: string;
  neighborhood: string;
  state: string;
  city: string;
  houseNumber: string;
  complement?: string;
  createdAt: string;
  onUpdate: () => void;
}

export const AddressField: React.FC<AddressItemProps> = ({
  zipCode,
  street,
  neighborhood,
  state,
  city,
  houseNumber,
  complement,
  createdAt,
  onUpdate,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700">
          {`${street}, ${houseNumber} ${
            complement ? `(${complement})` : ""
          } - ${neighborhood}, ${city} - ${state}`}
        </p>
        <p className="text-sm text-gray-500">
          CEP: {zipCode} | Criado em: {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <Button
        className="text-primary-400"
        color="secondary"
        variant="unstyled"
        onClick={onUpdate}
      >
        Editar
      </Button>
    </div>
  );
};
