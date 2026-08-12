// File: src/routes/departmentRoutes.js

import express from "express";

import {
    createDepartment,
    getDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
} from "../controllers/departmentController.js";

import { authenticate } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.js";
import { departmentValidator } from "../validators/departmentValidator.js";

const router = express.Router();


// Create Department (Admin Only)
router.post(
    "/",
    authenticate,
    authorizeRoles("admin"),
    departmentValidator,
    createDepartment
);


// Get All Departments
router.get(
    "/",
    authenticate,
    getDepartments
);


// Get Department By ID
router.get(
    "/:id",
    authenticate,
    getDepartmentById
);


// Update Department (Admin Only)
router.put(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    departmentValidator,
    updateDepartment
);


// Delete Department (Admin Only)
router.delete(
    "/:id",
    authenticate,
    authorizeRoles("admin"),
    deleteDepartment
);

export default router;