import dynamic from "next/dynamic";
import { Suspense } from "react";
import { UsersContextProvider } from "./_/context/UsersContext";

const Users = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Users)
);

const UsersPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UsersContextProvider>
        <Users />
      </UsersContextProvider>
    </Suspense>
  );
};

export default UsersPage;
