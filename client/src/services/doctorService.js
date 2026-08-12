import api from "../api/axios";

export const getDoctorsByDepartment = async (departmentId) => {

    const response =
        await api.get(`/doctors/department/${departmentId}`);

    return response.data.data;

};