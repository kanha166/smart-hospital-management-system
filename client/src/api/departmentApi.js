import api from "./axios";

export const getAllDepartments = async () => {
    const response = await api.get("/departments");

    return response.data.data;
};

export const getDoctorsByDepartment = async (departmentId) => {
    const response = await api.get(
        `/doctors/department/${departmentId}`
    );

    return response.data.data;
};
