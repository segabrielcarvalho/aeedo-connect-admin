import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface MutationState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

type MutationFunction<T, V> = (options?: {
  variables?: V;
}) => Promise<AxiosResponse<T>>;

/**
 * Hook para executar mutações HTTP usando Axios.
 * @param config Configuração base do Axios (ex: { url: "/api/users", method: "POST" })
 * @returns [função de execução, estado da mutação]
 */
export function useAxiosMutation<T = any, V = any>(
  config: AxiosRequestConfig
): [MutationFunction<T, V>, MutationState<T>] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const mutate: MutationFunction<T, V> = useCallback(
    async (options) => {
      setLoading(true);
      setError(null);

      try {
        const mergedConfig = {
          ...config,
          ...(options?.variables ? { data: options.variables } : {}),
        };

        const response = await axios(mergedConfig);
        setData(response.data);
        return response;
      } catch (err: any) {
        setError(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  return [mutate, { data, error, loading }];
}
