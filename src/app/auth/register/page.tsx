"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { Logo } from "@/components/Logo";
import routes from "@/routes";
import NextLink from "next/link";
import { useState } from "react";
import RoleButton from "./_/components/RoleButton";

const UserTypeButton = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-24 h-24 mx-auto rounded-lg border-2 ${
      selected
        ? "border-primary-default bg-primary-100"
        : "border-gray-300 bg-gray-100"
    }`}
  >
    {children}
  </button>
);

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<
    "doador" | "receptor" | null
  >(null);

  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <div>
        <Logo className="w-auto h-10" />

        <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
          Crie sua conta
        </h2>
        <p className="mt-2 text-sm/6 text-gray-500">
          Já tem uma conta?{" "}
          <NextLink
            href={routes.auth.login.path}
            className="font-normal text-primary-default hover:text-primary-700"
          >
            Entre agora
          </NextLink>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-8">
        <RoleButton
          role="doador"
          selectedRole={selectedRole}
          onSelect={setSelectedRole}
        />
        <RoleButton
          role="receptor"
          selectedRole={selectedRole}
          onSelect={setSelectedRole}
        />
      </div>

      <div className="mt-10">
        <div>
          <form action="#" method="POST" className="space-y-6">
            <Input label="Nome" name="name" />
            <Input label="Email" name="email" />
            <Input label="Senha" name="password" type="password" />
            <Input
              label="Confirmar Senha"
              name="confirmPassword"
              type="password"
            />

            <div className="text-sm/6 text-gray-500">
              Ao se registrar, você concorda com nossos
              <NextLink
                href="#"
                className="font-medium text-primary-default hover:text-primary-700 ml-1"
              >
                Termos de Serviço
              </NextLink>
              e nossa
              <NextLink
                href="#"
                className="font-medium text-primary-default hover:text-primary-700 ml-1"
              >
                Política de Privacidade
              </NextLink>
              .
            </div>

            <Button
              className="w-full"
              color="secondary"
              variant="solid"
              isDisabled={!selectedRole}
            >
              Registrar-se
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
