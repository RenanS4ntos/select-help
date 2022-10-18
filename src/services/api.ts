import axios, { AxiosInstance } from "axios";

export function API(token?: string): AxiosInstance {
  const api = axios.create({
    baseURL: "http://10.0.2.2:3333",
    headers: {
      email: "yagovela@gmail.com",
    },
  });

  return api;
}
