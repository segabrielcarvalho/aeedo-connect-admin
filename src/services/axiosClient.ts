import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import nookies from "nookies";
import routes from "../routes";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const cookies = nookies.get(null);
    const token = cookies.access_token;
    const tokenType = cookies.token_type;

    if (token && tokenType) {
      config.headers.set("Authorization", `${tokenType} ${token}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Não autorizado, redirecionando...");
      window.location.href = routes.auth.login.path;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
