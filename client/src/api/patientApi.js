// File: src/api/patientApi.js

import api from "./axios";


// GET CURRENT PATIENT PROFILE

export const getMyProfile = async () => {

    const response = await api.get(
        "/patients/profile"
    );

    return response.data;

};



// UPDATE CURRENT PATIENT PROFILE

export const updateMyProfile = async (formData) => {

    const response = await api.put(
        "/patients/profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};

// ================= ADMIN =================

// GET ALL PATIENTS

export const getAllPatients = async () => {

    const response = await api.get("/patients");

    return response.data.data;

};

// ======================
// ADMIN
// ======================

export const createPatient = async (formData) => {

    const response = await api.post(
        "/patients",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};

export const updatePatient = async (id, formData) => {

    const response = await api.put(
        `/patients/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;

};

export const deletePatient = async (id) => {

    const response = await api.delete(
        `/patients/${id}`
    );

    return response.data;

};