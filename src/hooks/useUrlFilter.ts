import debounce from "lodash.debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

interface IUseUrlFilterParams<T> {
  /**
   * O nome do parâmetro de URL a ser gerenciado.
   * @docGroup
   */
  name: string;

  /**
   * Tempo (em ms) para aguardar antes de atualizar a URL.
   *
   * Padrão: 0
   * @docGroup
   */
  delay?: number;

  /**
   * Callback opcional a ser executado quando o parâmetro de URL mudar.
   * @docGroup
   */
  callback?: (value: T | undefined | null) => void;
}

/**
 * Hook personalizado para gerenciar parâmetros de filtro na URL com um callback opcional.
 * @returns [filterValue, setFilter] - O valor atual do filtro e uma função para atualizá-lo.
 */
const useUrlFilter = function <T>({
  name,
  delay = 0,
  callback,
}: IUseUrlFilterParams<T>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = useMemo(() => {
    const originaValue = searchParams.get(name);

    if (originaValue === null || originaValue === undefined) return null;

    if (!isNaN(Number(originaValue)))
      return Number(originaValue) as unknown as T;

    if (originaValue === "true" || originaValue === "false")
      return (originaValue === "true") as unknown as T;

    return originaValue as unknown as T;
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
        router.push(`${pathname}?${params.toString()}`);
      }, delay),
    [name, searchParams, router, delay, pathname]
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
