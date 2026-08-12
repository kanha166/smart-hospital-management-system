import api from "../api/axios";

export const getAdminDashboard = async () => {
    const response = await api.get("/dashboard/admin");
    return response.data.data;
};

export const getDoctorDashboard = async () => {
    const response = await api.get("/dashboard/doctor");
    return response.data.data;
};

export const getPatientDashboard = async () => {
    const response = await api.get("/dashboard/patient");
    return response.data.data;
};