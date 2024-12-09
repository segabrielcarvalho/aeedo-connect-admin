import axios, { InternalAxiosRequestConfig } from "axios";
import nookies from "nookies";
import { client } from "../config";

const apiClient = axios.create({
  baseURL: client.baseURL || "http://localhost:3000/api",
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

export default apiClient;
