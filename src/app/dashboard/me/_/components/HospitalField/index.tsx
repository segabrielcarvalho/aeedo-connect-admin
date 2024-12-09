import Button from "@/components/Button";
import { Hospital } from "../../dto";

interface HospitalItemProps {
  hospital: Hospital;
}

export const HospitalField: React.FC<HospitalItemProps> = ({ hospital }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
    <div className="flex-1">
      <h3 className="text-lg font-semibold text-gray-900">{hospital.name}</h3>
      <p className="text-sm text-gray-600">
        <strong>Telefone:</strong> {hospital.phone} | <strong>Email:</strong>{" "}
        {hospital.email}
      </p>
      <p className="text-sm text-gray-600">
        <strong>CNPJ:</strong> {hospital.companyDocument} |{" "}
        <strong>Status:</strong>{" "}
        <span
          className={`font-semibold ${
            hospital.status ? "text-green-600" : "text-red-600"
          }`}
        >
          {hospital.status ? "Ativo" : "Inativo"}
        </span>
      </p>
      {hospital.address && (
        <p className="text-sm text-gray-600">
          <strong>Endereço:</strong> {hospital.address.street},{" "}
          {hospital.address.houseNumber}{" "}
          {hospital.address.complement && `(${hospital.address.complement})`},{" "}
          {hospital.address.neighbourhood}, {hospital.address.city} -{" "}
          {hospital.address.state}, CEP: {hospital.address.zipCode}
        </p>
      )}
    </div>
    <Button className="text-primary-400" color="secondary" variant="unstyled">
      Editar
    </Button>
  </div>
);
