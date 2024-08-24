import { AxiosRequestConfig } from "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    headers?: any; // Augment Axios headers type
  }
}

