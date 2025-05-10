import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_APP_MODE === "production"
      ? import.meta.env.VITE_PRODUCTION_API_URL
      : import.meta.env.VITE_DEVELOPMENT_API_URL,
  withCredentials: true,
});
