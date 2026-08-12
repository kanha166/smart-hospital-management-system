// File: src/controllers/authController.js

import { validationResult } from "express-validator";
import * as authService from "../services/authService.js";


export const register = async (req, res, next) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: "Validation failed.",
                errors: errors.array()
            });
        }


        const {
            name,
            email,
            password
        } = req.body;



        const result = await authService.register({
            name,
            email,
            password
        });



        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: result
        });


    } catch (error) {

        console.error("REGISTER ERROR:", error);


        if (error.message === "EMAIL_ALREADY_EXISTS") {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }


        next(error);

    }

};

// LOGIN USER
export const login = async (req, res, next) => {

    try {

        const {
            email,
            password
        } = req.body;


        const result = await authService.login(
            email,
            password
        );


        return res.status(200).json({
            success: true,
            message: "Login successful.",
            data: result
        });


    } catch (error) {

        console.error("LOGIN ERROR:", error);


        if (error.message === "INVALID_CREDENTIALS") {

            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });

        }


        next(error);

    }

};

// REFRESH ACCESS TOKEN
export const refreshToken = async (req, res, next) => {

    try {

        const { token } = req.body;


        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required."
            });
        }


        const result = await authService.refreshAccessToken(
            token
        );


        return res.status(200).json({
            success: true,
            message: "Access token refreshed successfully.",
            data: result
        });


    } catch (error) {

        console.error("REFRESH TOKEN ERROR:", error);


        if (
            error.message === "INVALID_REFRESH_TOKEN" ||
            error.message === "REFRESH_TOKEN_EXPIRED" ||
            error.message === "REFRESH_TOKEN_REVOKED"
        ) {

            return res.status(401).json({
                success: false,
                message: error.message
            });

        }


        next(error);

    }

};

// LOGOUT USER
export const logout = async (req, res, next) => {

    try {

        const { token } = req.body;


        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required."
            });
        }


        await authService.logout(token);


        return res.status(200).json({
            success: true,
            message: "Logout successful."
        });


    } catch (error) {

        console.error("LOGOUT ERROR:", error);


        if (error.message === "INVALID_REFRESH_TOKEN") {

            return res.status(401).json({
                success: false,
                message: "Invalid refresh token."
            });

        }


        next(error);

    }

};

// GET PROFILE
export const getProfile = async (req, res) => {

    const {
        password_hash,
        ...safeUser
    } = req.user;

    return res.status(200).json({
        success: true,
        data: safeUser
    });

};

// ADMIN TEST API
export const adminOnly = async (req, res) => {

    return res.status(200).json({
        success: true,
        message: "Welcome Admin!",
        data: req.user
    });

};