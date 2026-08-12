// File: src/validators/patientValidator.js

import { body } from "express-validator";


export const createPatientValidator = [

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


    body("phone")
        .optional()
        .trim(),


    body("date_of_birth")
        .optional()
        .isDate()
        .withMessage("Valid date of birth is required."),


    body("gender")
        .optional()
        .trim(),


    body("blood_group")
        .optional()
        .trim(),


    body("address")
        .optional()
        .trim(),


    body("emergency_contact")
        .optional()
        .trim()

];