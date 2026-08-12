// File: src/services/prescriptionService.js

import Prescription from "../models/Prescription.js";
import Appointment from "../models/Appointment.js";


// ==========================
// CREATE PRESCRIPTION
// ==========================

export const createPrescription = async (data) => {

    const {
        appointment_id
    } = data;


    const appointment =
        await Appointment.findById(
            appointment_id
        );


    if (!appointment) {

        throw new Error(
            "APPOINTMENT_NOT_FOUND"
        );

    }


    return await Prescription.create(data);

};


// ==========================
// GET ALL PRESCRIPTIONS
// ==========================

export const getPrescriptions = async () => {

    return await Prescription.findAll();

};


// ==========================
// GET PRESCRIPTION BY ID
// ==========================

export const getPrescriptionById = async (id) => {

    const prescription =
        await Prescription.findById(id);


    if (!prescription) {

        throw new Error(
            "PRESCRIPTION_NOT_FOUND"
        );

    }


    return prescription;

};


// ==========================
// GET BY APPOINTMENT
// DOCTOR
// ==========================

export const getPrescriptionsByAppointment =
async (appointment_id) => {

    const appointment =
        await Appointment.findById(
            appointment_id
        );


    if (!appointment) {

        throw new Error(
            "APPOINTMENT_NOT_FOUND"
        );

    }


    return await Prescription.findByAppointmentId(
        appointment_id
    );

};


// ==========================
// GET BY APPOINTMENT
// CURRENT PATIENT ONLY
// ==========================

export const getPatientPrescriptionsByAppointment =
async (
    appointment_id,
    user_id
) => {

    const appointment =
        await Appointment.findById(
            appointment_id
        );


    if (!appointment) {

        throw new Error(
            "APPOINTMENT_NOT_FOUND"
        );

    }


    const prescriptions =
        await Prescription.findByAppointmentIdForPatient(
            appointment_id,
            user_id
        );


    return prescriptions;

};


// ==========================
// UPDATE PRESCRIPTION
// ==========================

export const updatePrescription =
async (id, data) => {

    const prescription =
        await Prescription.findById(id);


    if (!prescription) {

        throw new Error(
            "PRESCRIPTION_NOT_FOUND"
        );

    }


    return await Prescription.update(
        id,
        data
    );

};


// ==========================
// DELETE PRESCRIPTION
// ==========================

export const deletePrescription =
async (id) => {

    const prescription =
        await Prescription.findById(id);


    if (!prescription) {

        throw new Error(
            "PRESCRIPTION_NOT_FOUND"
        );

    }


    await Prescription.delete(id);

};