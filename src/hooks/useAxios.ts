import apiClient from "@/services/axiosClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";

interface UseAxiosReturn<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  refetch: (overrideConfig?: AxiosRequestConfig) => Promise<AxiosResponse<T>>;
}

export function useAxios<T = any>(
  initialConfig: AxiosRequestConfig
): UseAxiosReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortController = useRef<AbortController | null>(null);

  const fetchData = async (
    overrideConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    setIsLoading(true);
    abortController.current = new AbortController();

    try {
      const response = await apiClient({
        ...initialConfig,
        ...overrideConfig,
        signal: abortController.current.signal,
      });
      setData(response.data.data);
      setError(null);
      return response;
    } catch (err: any) {
      setError(err);
      return Promise.reject(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData().catch(() => {});

    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, error, isLoading, refetch: fetchData };
}
