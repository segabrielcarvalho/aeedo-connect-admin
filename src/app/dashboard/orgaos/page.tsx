import dynamic from "next/dynamic";

const Orgaos = dynamic<Record<string, never>>(() => import("./_/index").then((x) => x.Orgaos));

export default Orgaos