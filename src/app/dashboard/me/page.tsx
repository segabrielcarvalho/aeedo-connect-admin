import dynamic from "next/dynamic";
import { MeContextProvider } from "./_/Context/MeContext";

const Me = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Me)
);

export default function MePage() {
  return (
    <MeContextProvider>
      <Me />
    </MeContextProvider>
  );
}
