import dynamic from "next/dynamic";

const Login = dynamic<Record<string, never>>(() =>
  import("./_/index").then((x) => x.Login)
);

function PageLogin() {
  return <Login />;
}

export default PageLogin;
