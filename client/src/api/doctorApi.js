import api from "./axios";

export const getAllDoctors = async () => {
    const response = await api.get("/doctors");
    return response.data.data;
};

export const createDoctor = async (formData) => {
    const response = await api.post("/doctors", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const updateDoctor = async (id, formData) => {
    const response = await api.put(`/doctors/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const deleteDoctor = async (id) => {
    const response = await api.delete(`/doctors/${id}`);
    return response.data;
};

export const getDoctorsByDepartment = async (departmentId) => {
    const response = await api.get(
        `/doctors/department/${departmentId}`
    );

    return response.data.data;
};