import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    "https://hospital-backend-vw9e.onrender.com/" ||
    import.meta.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
