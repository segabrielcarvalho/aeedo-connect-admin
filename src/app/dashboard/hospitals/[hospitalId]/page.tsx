import dynamic from "next/dynamic";
import { ShowHospitalsContextProvider } from "./_/context/ShowHospitalContext";

const ShowHospital = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.ShowExample)
);

export default function ShowHospitalPage() {
  return (
    <ShowHospitalsContextProvider>
      <ShowHospital />
    </ShowHospitalsContextProvider>
  );
}
