// File: src/routes/labReportRoutes.js

import express from "express";

import {
    createLabReport,
    getLabReports,
    getLabReportById,
    getLabReportsByPatient,
    getMyLabReports,
    updateLabReport,
    deleteLabReport
} from "../controllers/labReportController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

// Create Lab Report
// Admin only

router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    upload.single("report_file"),
    createLabReport
);

// Get All Lab Reports
// Admin only

router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getLabReports
);

// GET MY LAB REPORTS (PATIENT)

router.get(
    "/my",
    authenticate,
    getMyLabReports
);

// Get Lab Reports By Patient
// Admin / Doctor

router.get(
    "/patient/:patient_id",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getLabReportsByPatient
);

// Get Lab Report By ID
// Admin / Doctor

router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getLabReportById
);

// Update Lab Report
// Admin only

router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    upload.single("report_file"),
    updateLabReport
);

// Delete Lab Report
// Admin only

router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteLabReport
);

export default router;