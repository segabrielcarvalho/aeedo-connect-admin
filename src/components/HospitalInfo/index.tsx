"use client";

import useClipboard from "../../hooks/useClipboard";

interface HospitalProfileProps {
  name: string;
  email: string;
  isTest?: boolean;
}

export default function HospitalProfile({
  name,
  email,
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
