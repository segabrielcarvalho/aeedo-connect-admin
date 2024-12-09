import dynamic from "next/dynamic";

const CreateOrganPage = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.CreateOrganPage)
);

export default CreateOrganPage;
