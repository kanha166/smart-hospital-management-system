// File: src/routes/appointmentRoutes.js

import express from "express";

import {
    createAppointment,
    getAppointments,
    getAppointmentById,
    getPatientAppointments,
    bookPatientAppointment,
    updateAppointment,
    deleteAppointment,
    getDoctorAppointments,
    updateDoctorAppointment
} from "../controllers/appointmentController.js";
import { getMyAppointments } from "../controllers/patientController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

import { createAppointmentValidator } from "../validators/appointmentValidator.js";


const router = express.Router();

// Patient creates appointment
router.post(
    "/",
    authenticate,
    authorizeRoles("admin", "patient"),
    createAppointmentValidator,
    createAppointment
);

router.post(
    "/book",
    authenticate,
    authorizeRoles("patient"),
    createAppointmentValidator,
    bookPatientAppointment
);

// Admin views all appointments
router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getAppointments
);

router.get(
    "/my",
    authenticate,
    authorizeRoles("patient"),
    getMyAppointments
);

// Get appointment by ID
router.get(
    "/:id",
    authenticate,
    getAppointmentById
);

// Patient appointment history
router.get(
    "/patient/:patient_id",
    authenticate,
    authorizeRoles("patient", "doctor"),
    getPatientAppointments
);

// ==========================
// DOCTOR APPOINTMENTS
// ==========================

router.get(
    "/doctor/my",
    authenticate,
    authorizeRoles("doctor"),
    getDoctorAppointments
);

router.put(
    "/doctor/:id",
    authenticate,
    authorizeRoles("doctor"),
    updateDoctorAppointment
);

// Update appointment status
// Admin can update

router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    updateAppointment
);

// Delete appointment
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteAppointment
);

export default router;