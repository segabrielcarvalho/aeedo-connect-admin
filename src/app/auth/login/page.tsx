"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Logo } from "@/components/Logo";
import routes from "@/routes";
import NextLink from "next/link";

const PageLogin = () => {
  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <Logo className="w-auto h-10" />

        <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
          Entre na sua conta
        </h2>
        <p className="mt-2 text-sm/6 text-gray-500">
          Não é um membro?{" "}
          <NextLink
            href={routes.auth.register.path}
            className="font-normal text-primary-default hover:text-primary-default"
          >
            Registre-se agora
          </NextLink>
        </p>
      </div>

      <div className="mt-10">
        <div>
          <form action="#" method="POST" className="space-y-6">
            <Input label="Email" name="email" />
            <Input label="Senha" name="password" />

            <div className="flex items-center justify-end">
              <div className="text-sm/6">
                <NextLink
                  href="#"
                  className="font-medium text-secondary-300 hover:text-secondary-400"
                >
                  Esqueceu sua senha?
                </NextLink>
              </div>
            </div>

            <Button className="w-full" color="secondary" variant="solid">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
