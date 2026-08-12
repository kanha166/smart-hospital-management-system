// File: src/routes/consultationRoutes.js

import express from "express";

import {
    createConsultation,
    getConsultations,
    getConsultationById,
    getConsultationByAppointment,
    updateConsultation,
    deleteConsultation
} from "../controllers/consultationController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";


const router = express.Router();



// Create consultation
// Doctor/Admin only
router.post(
    "/",
    authenticate,
    authorizeRoles("doctor", "admin"),
    createConsultation
);



// Get all consultations
// Admin only
router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getConsultations
);



// Get consultation by ID
// Admin/Doctor only
router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getConsultationById
);



// Get consultation by appointment ID
// Admin/Doctor only
router.get(
    "/appointment/:appointment_id",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getConsultationByAppointment
);



// Update consultation
// Doctor/Admin only
router.put(
    "/:id",
    authenticate,
    authorizeRoles("doctor", "admin"),
    updateConsultation
);



// Delete consultation
// Admin only
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteConsultation
);



export default router;