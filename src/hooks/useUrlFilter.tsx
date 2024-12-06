"use client";

import debounce from "lodash.debounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

interface IUseUrlFilterParams<T> {
  /**
   * O nome do parâmetro de URL a ser gerenciado.
   */
  name: string;

  /**
   * Tempo (em ms) para aguardar antes de atualizar a URL.
   * Padrão: 0
   */
  delay?: number;

  /**
   * Callback opcional a ser executado quando o parâmetro de URL mudar.
   */
  callback?: (value: T | undefined | null) => void;

  /**
   * Lista de chaves dos filtros que devem ser limpados após a alteração de valor.
   */
  keysToReset?: string[];
}

/**
 * Hook personalizado para gerenciar parâmetros de filtro na URL com um callback opcional.
 * @returns [filterValue, setFilter] - O valor atual do filtro e uma função para atualizá-lo.
 */
const useUrlFilter = function <T>({
  name,
  delay = 0,
  callback,
  keysToReset = ["page_number"],
}: IUseUrlFilterParams<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = useMemo(() => {
    const originalValue = searchParams.get(name);

    if (originalValue === null || originalValue === undefined) return null;

    if (!isNaN(Number(originalValue)))
      return Number(originalValue) as unknown as T;

    if (originalValue === "true" || originalValue === "false")
      return (originalValue === "true") as unknown as T;

    return originalValue as unknown as T;
  }, [searchParams, name]);

  const debouncedSetFilter = useMemo(
    () =>
      debounce((value: T | undefined | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value !== null && value !== undefined && value !== "") {
          params.set(name, value.toString());
        } else {
          params.delete(name);
        }

        keysToReset.forEach((key) => {
          if (key !== name) params.delete(key);
        });

        router.replace(`?${params.toString()}`);
      }, delay),
    [name, searchParams, keysToReset, delay, router]
  );

  useEffect(() => {
    if (callback) callback(value);
  }, [value, callback]);

  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  return [value, debouncedSetFilter] as const;
};

export default useUrlFilter;
