// File: src/routes/doctorRoutes.js

import express from "express";

import {
    createDoctor,
    getDoctors,
    getDoctorById,
    getDoctorsByDepartment,
    updateDoctor,
    deleteDoctor
} from "../controllers/doctorController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { createDoctorValidator } from "../validators/doctorValidator.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create Doctor (Admin only)
router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    upload.single("doctor_image"),
    createDoctorValidator,
    createDoctor
);

// Get All Doctors (Authenticated users)
router.get(
    "/",
    authenticate,
    getDoctors
);

router.get(
    "/department/:departmentId",
    authenticate,
    getDoctorsByDepartment
);

// Get Doctor By ID (Authenticated users)
router.get(
    "/:id",
    authenticate,
    getDoctorById
);

// Update Doctor (Admin only)
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    upload.single("doctor_image"),
    updateDoctor
);

// Delete Doctor (Admin only)
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteDoctor
);

export default router;