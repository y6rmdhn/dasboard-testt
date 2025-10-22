import environment from "@/configs/environment";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: environment.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60 * 1000,
});

export default axiosInstance;
