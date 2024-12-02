"use client";

import Image from "next/image";
import useClipboard from "../../hooks/useClipboard";

interface HospitalProfileProps {
  name: string;
  email: string;
  avatarUrl: string;
  isTest?: boolean;
}

export default function HospitalProfile({
  name,
  email,
  avatarUrl,
  isTest = false,
}: HospitalProfileProps) {
  const { onCopy } = useClipboard(email, {
    error: "Falha ao copiar o email",
    success: "Email copiado com sucesso",
  });

  return (
    <div
      onClick={onCopy}
      className="flex items-center w-full gap-3 cursor-pointer"
    >
      <Image
        src={avatarUrl}
        alt={name}
        title={name}
        width={48}
        height={48}
        className="h-12 w-12 "
      />

      <div className="flex flex-col">
        {isTest && (
          <span className="self-start text-xs/3 font-semibold text-orange-500  rounded-md">
            Usuário de teste
          </span>
        )}
        <div className="flex flex-col">
          <p className="text-sm font-semibold truncate max-w-[10rem]">
            {name || "-"}
          </p>
          <p className="text-sm font-light truncate max-w-[10rem]">{email}</p>
        </div>
      </div>
    </div>
  );
}
