import dynamic from "next/dynamic";

const Users = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Users)
);

const UsersPage = () => {
  return <Users />;
};

export default UsersPage;
