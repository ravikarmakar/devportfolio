import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:9001/api",
  baseURL: "https://raviportfolio.krmsolutions.in/api",
});
