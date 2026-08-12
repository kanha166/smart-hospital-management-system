// File: src/routes/medicalRecordRoutes.js

import express from "express";

import {
    createMedicalRecord,
    getMedicalRecords,
    getMedicalRecordById,
    getMedicalRecordsByPatient,
    updateMedicalRecord,
    deleteMedicalRecord
} from "../controllers/medicalRecordController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();



// Create Medical Record
// Admin only
router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    createMedicalRecord
);



// Get All Medical Records
// Admin only
router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getMedicalRecords
);



// Get Medical Records By Patient
// Admin / Doctor
router.get(
    "/patient/:patient_id",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getMedicalRecordsByPatient
);



// Get Medical Record By ID
// Admin / Doctor
router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getMedicalRecordById
);



// Update Medical Record
// Admin only
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    updateMedicalRecord
);



// Delete Medical Record
// Admin only
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteMedicalRecord
);

export default router;