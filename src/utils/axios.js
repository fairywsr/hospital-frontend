import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/" || import.meta.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
