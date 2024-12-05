import SectionHeading from "@/components/SectionHeading";
import OrgaosTable from "./components/OrgaosTable";

export const Orgaos = () => {
  return (
    <div className="mx-auto lg:flex lg:gap-x-16 lg:px-8">
      <main className="px-4 py-10 sm:px-6 lg:flex-auto lg:px-0 ">
        <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
          <SectionHeading
            title="Órgãos"
            description="Gerencie os órgãos da plataforma"
          />

          <OrgaosTable userOrgans={["Coração", "Pulmão", "Rim"]} />
        </div>
      </main>
    </div>
  );
};
