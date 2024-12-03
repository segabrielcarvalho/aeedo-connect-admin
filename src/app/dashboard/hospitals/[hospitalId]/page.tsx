import dynamic from "next/dynamic";

const ShowHospital = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.ShowHospital)
);

export default function ShowHospitalPage() {
  return <ShowHospital />;
}
