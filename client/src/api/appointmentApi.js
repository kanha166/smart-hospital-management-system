import api from "./axios";

// ==========================
// ADMIN
// ==========================

export const getAllAppointments = async () => {

    const response = await api.get("/appointments");

    return response.data.data;

};

export const createAppointment = async (data) => {

    const response = await api.post(
        "/appointments",
        data
    );

    return response.data;

};

export const updateAppointment = async (id, data) => {

    const response = await api.put(
        `/appointments/${id}`,
        data
    );

    return response.data;

};

export const deleteAppointment = async (id) => {

    const response = await api.delete(
        `/appointments/${id}`
    );

    return response.data;

};

// ==========================
// PATIENT
// ==========================

// Get appointments of logged-in patient

export const getMyAppointments = async () => {

    const response = await api.get(
        "/appointments/my"
    );

    return response.data.data;

};

// Book appointment for logged-in patient

export const createPatientAppointment = async (data) => {

    const response = await api.post(
        "/appointments/book",
        data
    );

    return response.data.data;

};

// ==========================
// DOCTOR
// ==========================

export const getDoctorAppointments = async () => {

    const response =
        await api.get("/appointments/doctor/my");

    return response.data.data;

};

export const updateDoctorAppointment = async (
    id,
    data
) => {

    const response =
        await api.put(
            `/appointments/doctor/${id}`,
            data
        );

    return response.data;

};