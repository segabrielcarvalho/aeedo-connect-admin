import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("auth_token");
  if (token && config.headers) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Não autorizado, redirecionando...");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
