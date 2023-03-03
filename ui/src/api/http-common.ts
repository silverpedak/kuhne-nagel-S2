import axios, { AxiosInstance } from "axios";

export const httpCommon: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
