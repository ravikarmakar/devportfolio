import axios from "axios";

export const axiosInstance = axios.create({
<<<<<<< HEAD
  // baseURL: "http://localhost:9001/api",
  baseURL: "https://raviportfolio.krmsolutions.in/api",
=======
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_PRODUCTION_API_URL
      : import.meta.env.VITE_DEVELOPMENT_API_URL,
  withCredentials: true,
>>>>>>> portfolio-v2
});
