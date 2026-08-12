// File: client/src/api/prescriptionApi.js

import api from "./axios";

// ==========================
// CREATE PRESCRIPTION
// Doctor only
// ==========================

export const createPrescription = async (data) => {

    const response = await api.post(
        "/prescriptions",
        data
    );

    return response.data.data;
};


// ==========================
// GET PRESCRIPTIONS BY APPOINTMENT
// Doctor only
// ==========================

export const getPrescriptionsByAppointment = async (
    appointmentId
) => {

    const response = await api.get(
        `/prescriptions/appointment/${appointmentId}`
    );

    return response.data.data;
};


// ==========================
// GET PATIENT PRESCRIPTIONS BY APPOINTMENT
// Patient only
// ==========================

export const getPatientPrescriptionsByAppointment = async (
    appointmentId
) => {

    const response = await api.get(
        `/prescriptions/patient/appointment/${appointmentId}`
    );

    return response.data.data;
};


// ==========================
// GET PRESCRIPTION BY ID
// Patient / Doctor
// ==========================

export const getPrescriptionById = async (id) => {

    const response = await api.get(
        `/prescriptions/${id}`
    );

    return response.data.data;
};


// ==========================
// UPDATE PRESCRIPTION
// Doctor only
// ==========================

export const updatePrescription = async (
    id,
    data
) => {

    const response = await api.put(
        `/prescriptions/${id}`,
        data
    );

    return response.data.data;
};


// ==========================
// DELETE PRESCRIPTION
// Doctor only
// ==========================

export const deletePrescription = async (id) => {

    const response = await api.delete(
        `/prescriptions/${id}`
    );

    return response.data;
};