// File: src/api/consultationApi.js

import api from "./axios";

// ==========================
// CREATE CONSULTATION
// Doctor / Admin
// ==========================

export const createConsultation = async (data) => {

    const response = await api.post(
        "/consultations",
        data
    );

    return response.data.data;

};


// ==========================
// GET ALL CONSULTATIONS
// Admin
// ==========================

export const getConsultations = async () => {

    const response = await api.get(
        "/consultations"
    );

    return response.data.data;

};


// ==========================
// GET CONSULTATION BY ID
// Doctor / Admin
// ==========================

export const getConsultationById = async (id) => {

    const response = await api.get(
        `/consultations/${id}`
    );

    return response.data.data;

};


// ==========================
// GET CONSULTATION BY APPOINTMENT
// Doctor / Admin
// ==========================

export const getConsultationByAppointment = async (
    appointmentId
) => {

    const response = await api.get(
        `/consultations/appointment/${appointmentId}`
    );

    return response.data.data;

};


// ==========================
// UPDATE CONSULTATION
// Doctor / Admin
// ==========================

export const updateConsultation = async (
    id,
    data
) => {

    const response = await api.put(
        `/consultations/${id}`,
        data
    );

    return response.data.data;

};


// ==========================
// DELETE CONSULTATION
// Admin
// ==========================

export const deleteConsultation = async (id) => {

    const response = await api.delete(
        `/consultations/${id}`
    );

    return response.data;

};