import dynamic from "next/dynamic";
import { OrgansContextProvider } from "./_/context/OrgansContext";

const Organs = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Organs)
);

export default function OrgansPage() {
  return (
    <OrgansContextProvider>
      <Organs />
    </OrgansContextProvider>
  );
}
