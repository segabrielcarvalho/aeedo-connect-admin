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

interface AddressDetailProps {
  label: string;
  value: string;
}

const AddressDetail: React.FC<AddressDetailProps> = ({ label, value }) => (
  <div>
    <span className="block text-sm font-medium text-gray-700">{label}</span>
    <p className="text-gray-900">{value}</p>
  </div>
);

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
    <li className="flex flex-col gap-y-4 py-6 border-b border-gray-200">
      <AddressDetail
        label="Endereço"
        value={`${street}, ${houseNumber} ${
          complement ? `(${complement})` : ""
        }`}
      />
      <AddressDetail label="Bairro" value={neighborhood} />

      <div className="flex gap-10">
        <AddressDetail label="Cidade" value={city} />
        <AddressDetail label="Estado" value={state} />
      </div>

      <div className="flex gap-10">
        <AddressDetail label="CEP" value={zipCode} />
        <AddressDetail
          label="Criado em"
          value={new Date(createdAt).toLocaleDateString()}
        />
      </div>

      <Button
        className="text-primary-400"
        color="secondary"
        variant="unstyled"
        onClick={onUpdate}
      >
        Editar
      </Button>
    </li>
  );
};
