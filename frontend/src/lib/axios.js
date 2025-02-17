import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:5000/api" // URL locale de l'API pendant le développement
    : "https://chat-app-production-1876.up.railway.app/api": "/api", // URL de l'API en production sur Railway
  withCredentials: true,
});
