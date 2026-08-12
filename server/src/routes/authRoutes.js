// File: src/routes/authRoutes.js

import express from "express";

import {
    register,
    login,
    refreshToken,
    logout,
    getProfile,
    adminOnly
} from "../controllers/authController.js";

import { registerValidator } from "../validators/authValidator.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";


const router = express.Router();


// Register API
router.post(
    "/register",
    registerValidator,
    register
);


// Login API
router.post(
    "/login",
    login
);


// Refresh Token API
router.post(
    "/refresh-token",
    refreshToken
);

// Logout API
router.post(
    "/logout",
    logout
);

// Profile API
router.get(
    "/profile",
    authenticate,
    authorizeRoles("patient"),
    getProfile
);

// Admin Test API
router.get(
    "/admin",
    authenticate,
    authorizeRoles("admin"),
    adminOnly
);

export default router;