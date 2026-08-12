// File: src/routes/prescriptionRoutes.js

import express from "express";

import {
    createPrescription,
    getPrescriptions,
    getPrescriptionById,
    getPrescriptionsByAppointment,
    getPatientPrescriptionsByAppointment,
    updatePrescription,
    deletePrescription
} from "../controllers/prescriptionController.js";


import { authenticate }
    from "../middleware/authMiddleware.js";

import { authorizeRoles }
    from "../middleware/authorizeRoles.js";


const router = express.Router();


// ==========================
// CREATE PRESCRIPTION
// DOCTOR ONLY
// ==========================

router.post(
    "/",
    authenticate,
    authorizeRoles("doctor"),
    createPrescription
);


// ==========================
// GET ALL PRESCRIPTIONS
// DOCTOR ONLY
// ==========================

router.get(
    "/",
    authenticate,
    authorizeRoles("doctor"),
    getPrescriptions
);

// ==========================
// GET PRESCRIPTIONS BY APPOINTMENT
// DOCTOR + PATIENT
// ==========================

router.get(
    "/appointment/:appointment_id",
    authenticate,
    authorizeRoles("doctor"),
    getPrescriptionsByAppointment
);

router.get(
    "/patient/appointment/:appointment_id",
    authenticate,
    authorizeRoles("patient"),
    getPatientPrescriptionsByAppointment
);

// ==========================
// GET PRESCRIPTION BY ID
// DOCTOR + PATIENT
// ==========================

router.get(
    "/:id",
    authenticate,
    authorizeRoles("doctor", "patient"),
    getPrescriptionById
);


// ==========================
// UPDATE PRESCRIPTION
// DOCTOR ONLY
// ==========================

router.put(
    "/:id",
    authenticate,
    authorizeRoles("doctor"),
    updatePrescription
);


// ==========================
// DELETE PRESCRIPTION
// DOCTOR ONLY
// ==========================

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("doctor"),
    deletePrescription
);


export default router;