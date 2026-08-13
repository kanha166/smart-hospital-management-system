// File: src/api/axios.js

import axios from "axios";

const api = axios.create({
    baseURL: "https://smart-hospital-api-kxep.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});
api.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }
        return config;
    },

    (error) => {
        return Promise.reject(error);
    }

);
export default api;