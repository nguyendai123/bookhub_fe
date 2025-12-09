// src/api/apiClient.js
import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
    baseURL: "http://localhost:8080/", // thay đổi theo backend
    timeout: 15000,
});

// Add Authorization header
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get("jwt_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default apiClient;
