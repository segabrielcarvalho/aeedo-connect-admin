import apiClient from "@/services/axiosClient";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

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

  const fetchData = async (
    overrideConfig?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    setIsLoading(true);
    try {
      const response: AxiosResponse<T> = await apiClient({
        ...initialConfig,
        ...overrideConfig,
      });
      setData(response.data);
      setError(null);
      return response;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isLoading, refetch: fetchData };
}
