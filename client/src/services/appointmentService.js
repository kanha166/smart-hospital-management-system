import api from "../api/axios";

// GET MY APPOINTMENTS
export const getMyAppointments = async () => {

    const response = await api.get("/appointments/my");

    return response.data.data;

};


// CREATE APPOINTMENT
export const createAppointment = async (data) => {

    const response = await api.post(
        "/appointments",
        data
    );

    return response.data;

};

// BOOK APPOINTMENT
export const bookAppointment = async (data) => {

    const response = await api.post(
        "/appointments/book",
        data
    );

    return response.data;

};