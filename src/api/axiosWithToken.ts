import { useAuthStore } from "@/store/authStore";
import axios from "axios";

const axiosWithToken = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "application/json", // Default headers
  },
});

// Add a request interceptor to include the token from Zustand store
axiosWithToken.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    console.log({ token }, "-----token-----");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Add token to the header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosWithToken;
