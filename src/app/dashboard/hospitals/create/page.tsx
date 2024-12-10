import dynamic from "next/dynamic";
import { HospitalsContextProvider } from "../_/context/HospitalContext";

const CreateHospital = dynamic<Record<string, never>>(() =>
  import("./_").then((x) => x.CreateHospital)
);

const CreateHospitalPage = () => {
  return (
    <HospitalsContextProvider>
      <CreateHospital />
    </HospitalsContextProvider>
  );
};

export default CreateHospitalPage;
