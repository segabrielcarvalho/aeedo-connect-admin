"use client";
import Button from "@/components/Button";
import { Input } from "@/components/Form/Input";
import { useAuthContext } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import NextLink from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema, LoginSchema, LoginVariables } from "../dto";

export const LoginForm = () => {
  const { signIn } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginVariables> = async (data) => {
    setIsSubmitting(true);
    try {
      await signIn(data);
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10">
      <div>
        <div className="space-y-6">
          <Input
            label="Email"
            type="email"
            isRequired
            placeholder="Digite seu email"
            error={errors.email}
            {...register("email")}
          />

          <Input
            label="Senha"
            isRequired
            type="password"
            placeholder="Digite sua senha"
            error={errors.password}
            {...register("password")}
          />
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <NextLink
                href="/auth/forgot-password"
                className="font-medium text-secondary-300 hover:text-secondary-400"
              >
                Esqueceu sua senha?
              </NextLink>
            </div>
          </div>

          <Button
            className="w-full"
            color="secondary"
            variant="solid"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </div>
      </div>
    </div>
  );
};
