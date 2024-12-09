import { Logo } from "@/components/Logo";
import routes from "@/routes";
import NextLink from "next/link";
import { LoginForm } from "./components/LoginForm";

export const Login = () => {
  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <Logo className="w-auto h-10" />

        <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
          Entre na sua conta
        </h2>
        <p className="mt-2 text-sm/6 text-gray-500">
          Não é um membro?
          <NextLink
            href={routes.auth.register.path}
            className="font-normal text-primary-default hover:text-primary-default ml-1"
          >
            Registre-se agora
          </NextLink>
        </p>
      </div>

      <LoginForm />
    </div>
  );
};
