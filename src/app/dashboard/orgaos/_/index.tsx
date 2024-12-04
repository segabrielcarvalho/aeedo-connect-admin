import SectionHeading from "@/components/SectionHeading";
import OrgaosTable from "./components/OrgaosTable";

export const Orgaos = () => {
  return (
    <>
      <SectionHeading
        title="Órgãos"
        description="Gerencie os órgãos da plataforma"
      />

      <OrgaosTable />
    </>
  )
};