// File: server/src/routes/invoiceRoutes.js

import express from "express";

import {
    createInvoice,
    getInvoices,
    getInvoiceById,
    getInvoicesByPatient,
    updateInvoice,
    deleteInvoice
} from "../controllers/invoiceController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";

const router = express.Router();


// ==========================
// ADMIN
// ==========================

// Create Invoice
router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    createInvoice
);


// Get All Invoices
router.get(
    "/",
    authenticate,
    authorizeRoles("admin"),
    getInvoices
);


// Get Invoice By ID
router.get(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    getInvoiceById
);


// Update Invoice
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    updateInvoice
);


// Delete Invoice
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteInvoice
);


// ==========================
// ADMIN + PATIENT
// ==========================

// Get Invoices By Patient
router.get(
    "/patient/:patient_id",
    authenticate,
    authorizeRoles("admin", "patient"),
    getInvoicesByPatient
);


export default router;