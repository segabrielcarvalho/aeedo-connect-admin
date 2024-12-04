import { Hospital } from "../Sections/HospitalSection/page";

interface HospitalItemProps {
  hospital: Hospital;
  onEdit: (id: number) => void;
}

export const HospitalField: React.FC<HospitalItemProps> = ({
  hospital,
  onEdit,
}) => (
  <li className="py-6 border-2 p-4 rounded-lg">
    <div className="flex justify-between items-center mb-4">
      <div className="text-lg font-semibold text-gray-900">{hospital.name}</div>
    </div>
    <div className="text-gray-600">
      <p>
        <strong>Telefone:</strong> {hospital.phone}
      </p>
      <p>
        <strong>Email:</strong> {hospital.email}
      </p>
      <p>
        <strong>CNPJ:</strong> {hospital.cnpj}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold ${
            hospital.status === "Ativo" ? "text-green-600" : "text-red-600"
          }`}
        >
          {hospital.status}
        </span>
      </p>
    </div>
    <div className="mt-4 text-gray-600">
      <h3 className="text-sm font-semibold text-gray-900">Endereço</h3>
      <p>
        {hospital.address.street}, {hospital.address.houseNumber}{" "}
        {hospital.address.complement && `(${hospital.address.complement})`}
      </p>
      <p>
        {hospital.address.neighborhood}, {hospital.address.city} -{" "}
        {hospital.address.state}
      </p>
      <p>
        <strong>CEP:</strong> {hospital.address.zipCode}
      </p>
    </div>
  </li>
);
