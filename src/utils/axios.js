import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.BACKEND_URL ||
    "https://hospital-backend-vw9e.onrender.com/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
