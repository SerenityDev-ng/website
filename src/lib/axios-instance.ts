
import { useAuthStore } from "@/hooks/store/user";
import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "https://backend-c2f9.onrender.com",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from Zustand store
    const token = useAuthStore.getState().user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error("Request error:", error.response.data);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    console.log(error);
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Token expired or invalid, logout user
      useAuthStore.getState().logout();
      // Redirect to login
      window.location.href = "/callback/sign-in";
    }

    return Promise.reject(error);
  }
);

export default api;
