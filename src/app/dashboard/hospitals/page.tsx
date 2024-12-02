import dynamic from "next/dynamic";

const Hospitals = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Hospitals) // Importa o módulo e retorna o componente Hospitals
);

const HospitalsPage = () => {
  return <Hospitals />;
};

export default HospitalsPage;
