// File: src/validators/appointmentValidator.js

import { body } from "express-validator";


export const createAppointmentValidator = [

    body("patient_id")
        .notEmpty()
        .withMessage("Patient ID is required.")
        .isInt()
        .withMessage("Patient ID must be a number."),


    body("doctor_id")
        .notEmpty()
        .withMessage("Doctor ID is required.")
        .isInt()
        .withMessage("Doctor ID must be a number."),


    body("appointment_date")
        .notEmpty()
        .withMessage("Appointment date is required.")
        .isDate()
        .withMessage("Invalid appointment date."),


    body("appointment_time")
        .notEmpty()
        .withMessage("Appointment time is required."),


    body("reason")
        .optional()
        .trim()

];