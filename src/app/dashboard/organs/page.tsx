import dynamic from "next/dynamic";

const Organs = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Organs)
);

export default Organs;
