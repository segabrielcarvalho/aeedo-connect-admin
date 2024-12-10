import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";
import routes from "@/routes";
import { HospitalsTable } from "./components/HospitalsTable";

export const Hospitals = () => {
  return (
    <>
      <SectionHeading
        title="Hospitais"
        description="Gerencie os Hospitais da plataforma"
      >
        <Button
          href={routes.dashboard.hospitals.create.path}
          color="secondary"
          variant="solid"
        >
          Criar Hospital
        </Button>
      </SectionHeading>

      <HospitalsTable />
    </>
  );
};
