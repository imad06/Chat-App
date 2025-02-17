import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://chat-app-production-1876.up.railway.app" : "/api",
  withCredentials: true,
});
