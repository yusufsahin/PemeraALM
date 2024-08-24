import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL ="http://localhost:3500/api";
// Create a function to configure and return an Axios instance
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor to attach the authorization token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        // Ensure config.headers is not undefined before accessing it
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
        console.log(config);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default createAxiosInstance();
