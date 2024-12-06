import dynamic from "next/dynamic";
import { UsersContextProvider } from "./_/context/UsersContext";

const Users = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Users)
);

const UsersPage = () => {
  return (
    <UsersContextProvider>
      <Users />
    </UsersContextProvider>
  );
};

export default UsersPage;
