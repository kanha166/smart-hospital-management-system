import express from "express";

import {

    getAdminDashboard,
    getDoctorDashboard,
    getPatientDashboard

} from "../controllers/dashboardController.js";

import {

    authenticate

} from "../middleware/authMiddleware.js";

import {

    authorizeRoles

} from "../middleware/authorizeRoles.js";

const router = express.Router();

router.get(

    "/admin",

    authenticate,

    authorizeRoles("admin"),

    getAdminDashboard

);

router.get(

    "/doctor",

    authenticate,

    authorizeRoles("doctor"),

    getDoctorDashboard

);

router.get(

    "/patient",

    authenticate,

    authorizeRoles("patient"),

    getPatientDashboard

);

export default router;