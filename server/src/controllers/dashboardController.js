// File: src/controllers/dashboardController.js

import * as dashboardService from "../services/dashboardService.js";

// ================= ADMIN =================

export const getAdminDashboard = async (req, res, next) => {

    try {

        const dashboard =
            await dashboardService.getAdminDashboard();

        return res.status(200).json({

            success: true,

            data: dashboard

        });

    } catch (error) {

        next(error);

    }

};

// ================= DOCTOR =================

export const getDoctorDashboard = async (req, res, next) => {

    try {

        const dashboard =
            await dashboardService.getDoctorDashboard(req.user.id);

        return res.status(200).json({

            success: true,

            data: dashboard

        });

    } catch (error) {

        next(error);

    }

};

// ================= PATIENT =================

export const getPatientDashboard = async (req, res, next) => {

    try {

        const dashboard =
            await dashboardService.getPatientDashboard(req.user.id);

        return res.status(200).json({

            success: true,

            data: dashboard

        });

    } catch (error) {

        next(error);

    }

};