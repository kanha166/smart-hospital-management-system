// File: src/controllers/appointmentController.js

import * as appointmentService from "../services/appointmentService.js";

// CREATE APPOINTMENT
export const createAppointment = async (req, res, next) => {
    try {
        const appointment = await appointmentService.createAppointment(req.body);

        return res.status(201).json({
            success: true,
            message: "Appointment created successfully.",
            data: appointment
        });
    } catch (error) {
        if (error.message === "PATIENT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Patient not found."
            });
        }

        if (error.message === "DOCTOR_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Doctor not found."
            });
        }

        next(error);
    }
};

// GET ALL APPOINTMENTS
export const getAppointments = async (req, res, next) => {
    try {
        const appointments = await appointmentService.getAppointments();

        return res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

// GET APPOINTMENT BY ID
export const getAppointmentById = async (req, res, next) => {
    try {
        const appointment = await appointmentService.getAppointmentById(
            req.params.id
        );

        return res.status(200).json({
            success: true,
            data: appointment
        });
    } catch (error) {
        if (error.message === "APPOINTMENT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        next(error);
    }
};

// GET PATIENT APPOINTMENTS
export const getPatientAppointments = async (req, res, next) => {
    try {
        const appointments =
            await appointmentService.getPatientAppointments(
                req.params.patient_id
            );

        return res.status(200).json({
            success: true,
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE APPOINTMENT
export const updateAppointment = async (req, res, next) => {
    try {
        const appointment = await appointmentService.updateAppointment(
            req.params.id,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Appointment updated successfully.",
            data: appointment
        });
    } catch (error) {
        if (error.message === "APPOINTMENT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        next(error);
    }
};

// DELETE APPOINTMENT
export const deleteAppointment = async (req, res, next) => {
    try {
        await appointmentService.deleteAppointment(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Appointment deleted successfully."
        });
    } catch (error) {
        if (error.message === "APPOINTMENT_NOT_FOUND") {
            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });
        }

        next(error);
    }
};

export const bookPatientAppointment = async (req, res, next) => {

    try {

        const appointment =
            await appointmentService.createPatientAppointment(
                req.user.id,
                req.body
            );


        return res.status(201).json({

            success: true,

            message: "Appointment booked successfully.",

            data: appointment

        });


    } catch(error) {


        if(error.message === "PATIENT_NOT_FOUND") {

            return res.status(404).json({

                success:false,

                message:"Patient profile not found."

            });

        }


        if(error.message === "DOCTOR_NOT_FOUND") {

            return res.status(404).json({

                success:false,

                message:"Doctor not found."

            });

        }


        next(error);

    }

};

export const getDoctorAppointments = async (
    req,
    res,
    next
) => {

    try {

        const appointments =
            await appointmentService.getDoctorAppointments(
                req.user.id
            );

        return res.status(200).json({

            success: true,

            data: appointments

        });

    } catch (error) {

        if (
            error.message ===
            "DOCTOR_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message: "Doctor profile not found."

            });

        }

        next(error);

    }

};

export const updateDoctorAppointment = async (
    req,
    res,
    next
) => {

    try {

        const appointment =
            await appointmentService.updateDoctorAppointment(

                req.user.id,

                req.params.id,

                req.body

            );

        return res.status(200).json({

            success: true,

            message:
                "Appointment updated successfully.",

            data: appointment

        });

    } catch (error) {

        if (
            error.message ===
            "DOCTOR_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message: "Doctor profile not found."

            });

        }

        if (
            error.message ===
            "APPOINTMENT_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message: "Appointment not found."

            });

        }

        if (
            error.message ===
            "APPOINTMENT_NOT_ASSIGNED"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "This appointment is not assigned to you."

            });

        }

        if (
            error.message ===
            "ADMIN_BOOKED_APPOINTMENT"
        ) {

            return res.status(403).json({

                success: false,

                message:
                    "Admin-booked appointments cannot be modified by doctors."

            });

        }

        next(error);

    }

};