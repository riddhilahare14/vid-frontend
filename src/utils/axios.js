// src/utils/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("axiosInstance: Sending Authorization:", config.headers.Authorization); // Debug
    } else {
      console.log("axiosInstance: No token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;