// File: src/routes/pharmacyRoutes.js

import express from "express";

import {
    createMedicine,
    getMedicines,
    getMedicineById,
    updateMedicine,
    deleteMedicine
} from "../controllers/pharmacyController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();

// Add Medicine
// Admin only
router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    createMedicine
);

// Get All Medicines
// Admin / Doctor
router.get(
    "/",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getMedicines
);

// Get Medicine By ID
// Admin / Doctor
router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin", "doctor"),
    getMedicineById
);

// Update Medicine
// Admin only
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    updateMedicine
);

// Delete Medicine
// Admin only
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteMedicine
);

export default router;