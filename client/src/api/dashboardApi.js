import api from "./axios";

export const getPatientDashboard = async () => {

    const response = await api.get("/dashboard/patient");

    return response.data;

};