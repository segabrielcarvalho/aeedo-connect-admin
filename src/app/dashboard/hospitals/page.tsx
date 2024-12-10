import dynamic from "next/dynamic";
import { HospitalsContextProvider } from "./_/context/HospitalContext";

const Hospitals = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Hospitals)
);

const HospitalsPage = () => {
  return (
    <HospitalsContextProvider>
      <Hospitals />
    </HospitalsContextProvider>
  );
};

export default HospitalsPage;
