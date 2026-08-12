// File: src/routes/patientRoutes.js

import express from "express";

import {
    createPatient,
    getPatients,
    getPatientById,
    getMyProfile,
    updateMyProfile,
    updatePatient,
    deletePatient
} from "../controllers/patientController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { createPatientValidator } from "../validators/patientValidator.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==========================
// CREATE PATIENT (ADMIN)
// ==========================

router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    createPatientValidator,
    upload.single("profile_image"),
    createPatient
);

// ==========================
// GET ALL PATIENTS
// ==========================

router.get(
    "/",
    authenticate,
    getPatients
);

// ==========================
// GET MY PROFILE (PATIENT)
// ==========================

router.get(
    "/profile",
    authenticate,
    authorizeRoles("patient"),
    getMyProfile
);

// ==========================
// UPDATE MY PROFILE (PATIENT)
// ==========================

router.put(
    "/profile",
    authenticate,
    authorizeRoles("patient"),
    upload.single("profile_image"),
    updateMyProfile
);

// ==========================
// GET PATIENT BY ID
// ==========================

router.get(
    "/:id",
    authenticate,
    getPatientById
);

// ==========================
// UPDATE PATIENT (ADMIN)
// ==========================

router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    upload.single("profile_image"),
    updatePatient
);

// ==========================
// DELETE PATIENT (ADMIN)
// ==========================

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deletePatient
);

export default router;