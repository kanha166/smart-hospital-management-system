// File: src/api/authApi.js

import axios from "axios";

const API = axios.create({

    baseURL: "http://localhost:5000/api",

    headers: {
        "Content-Type": "application/json"
    }

});


// Register User

export const registerUser = async (userData) => {

    const response = await API.post(
        "/auth/register",
        userData
    );

    return response.data;

};


// Login User

export const loginUser = async (credentials) => {

    const response = await API.post(
        "/auth/login",
        credentials
    );

    return response.data;

};

export default API;