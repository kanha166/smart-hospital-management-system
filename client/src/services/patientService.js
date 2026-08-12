import api from "../api/axios";

export const getPatients = async () => {
    const response = await api.get("/patients");
    return response.data.data;
};

export const createPatient = async (patient) => {
    const response = await api.post("/patients", patient);
    return response.data;
};

export const updatePatient = async (id, patient) => {
    const response = await api.put(`/patients/${id}`, patient);
    return response.data;
};

export const deletePatient = async (id) => {
    const response = await api.delete(`/patients/${id}`);
    return response.data;
};

export const getMyProfile = async () => {
    const response = await api.get("/patients/profile");
    return response.data.data;
};

export const updateMyProfile = async (formData) => {
    const response = await api.put("/patients/profile", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data.data;
};
