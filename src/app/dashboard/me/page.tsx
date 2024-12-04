import dynamic from "next/dynamic";

const ShowUser = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.ShowUser)
);

export default function ShowUserPage() {
  return <ShowUser />;
}
