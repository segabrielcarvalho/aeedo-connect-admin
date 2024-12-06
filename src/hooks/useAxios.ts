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
      const response: AxiosResponse<T> = await apiClient({
        ...initialConfig,
        ...overrideConfig,
        signal: abortController.current.signal,
      });
      setData(response.data);
      setError(null);
      return response;
    } catch (err: any) {
      if (err.name === "CanceledError") {
        console.log("Requisição cancelada", err.message);
      } else {
        setError(err);
        throw err;
      }
      throw new Error("Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  return { data, error, isLoading, refetch: fetchData };
}
