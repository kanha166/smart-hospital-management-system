// File: src/validators/doctorValidator.js

import { body } from "express-validator";


export const createDoctorValidator = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required."),


    body("email")
        .trim()
        .isEmail()
        .withMessage("Valid email is required."),


    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters."),


    body("department_id")
        .notEmpty()
        .withMessage("Department is required.")
        .isInt()
        .withMessage("Department ID must be an integer."),


    body("specialization")
        .trim()
        .notEmpty()
        .withMessage("Specialization is required."),


    body("qualification")
        .optional()
        .trim(),


    body("consultation_fee")
        .optional()
        .isNumeric()
        .withMessage("Consultation fee must be a number.")

];