// File: src/services/patientService.js

import bcrypt from "bcrypt";

import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";

export const getMyAppointments = async (userId) => {

    const patient = await Patient.findByUserId(userId);

    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }

    return await Appointment.findByPatientId(patient.id);
};

// CREATE PATIENT (Admin)
export const createPatient = async (patientData) => {

    const {
        name,
        email,
        password,
        phone,
        date_of_birth,
        gender,
        blood_group,
        address,
        emergency_contact,
        profile_image
    } = patientData;



    // Check existing email

    const existingUser =
        await User.findByEmail(email);


    if (existingUser) {

        throw new Error(
            "EMAIL_ALREADY_EXISTS"
        );

    }



    // Hash password

    const password_hash =
        await bcrypt.hash(
            password,
            12
        );



    // Create user account

    const user =
        await User.create({

            name,
            email,
            password_hash,
            role: "patient"

        });



    // Create patient profile

    const patient =
        await Patient.create({

            user_id: user.id,
            phone,
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,
            profile_image

        });



    return {

        user: {

            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role

        },


        patient

    };

};




// GET ALL PATIENTS

export const getPatients = async () => {

    return await Patient.findAll();

};




// GET PATIENT BY ID

export const getPatientById = async (id) => {

    const patient =
        await Patient.findById(id);



    if (!patient) {

        throw new Error(
            "PATIENT_NOT_FOUND"
        );

    }



    return patient;

};

// ==========================
// GET LOGGED-IN PATIENT PROFILE
// ==========================

export const getMyProfile = async (userId) => {

    const patient = await Patient.findByUserId(userId);

    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }

    return patient;

};



// ==========================
// UPDATE LOGGED-IN PATIENT PROFILE
// ==========================

export const updateMyProfile = async (
    userId,
    data
) => {

    const patient = await Patient.findByUserId(userId);

    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }

    return await Patient.updateByUserId(
        userId,
        data
    );

};


// UPDATE PATIENT

export const updatePatient = async (
    id,
    data
) => {


    const patient =
        await Patient.findById(id);



    if (!patient) {

        throw new Error(
            "PATIENT_NOT_FOUND"
        );

    }



    return await Patient.update(
        id,
        data
    );

};




// DELETE PATIENT

export const deletePatient = async (id) => {


    const patient =
        await Patient.findById(id);



    if (!patient) {

        throw new Error(
            "PATIENT_NOT_FOUND"
        );

    }



    await Patient.delete(id);

};

export const findByUserId = async (user_id) => {

    const result = await pool.query(
        `
        SELECT *
        FROM patients
        WHERE user_id = $1
        `,
        [user_id]
    );

    return result.rows[0];

};