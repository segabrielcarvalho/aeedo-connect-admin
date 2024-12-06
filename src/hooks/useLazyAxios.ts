// hooks/useLazyAxios.ts
import apiClient from "@/services/axiosClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";

interface LazyAxiosReturn<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
}

type LazyAxiosExecute<T> = (
  config: AxiosRequestConfig
) => Promise<AxiosResponse<T>>;

export function useLazyAxios<T = any>(): [
  LazyAxiosExecute<T>,
  LazyAxiosReturn<T>
] {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute: LazyAxiosExecute<T> = useCallback(async (config) => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await apiClient(config);
      setData(response.data);
      setError(null);
      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return [execute, { data, error, isLoading }];
}
