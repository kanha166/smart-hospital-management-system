import api from "./axios";

export const getMedicines = async () => {
    const response = await api.get("/pharmacy");
    return response.data.data;
};

export const createMedicine = async (data) => {
    const response = await api.post("/pharmacy", data);
    return response.data;
};

export const updateMedicine = async (id, data) => {
    const response = await api.put(`/pharmacy/${id}`, data);
    return response.data;
};

export const deleteMedicine = async (id) => {
    const response = await api.delete(`/pharmacy/${id}`);
    return response.data;
};

export const getMedicineById = async (id) => {
    const response = await api.get(`/pharmacy/${id}`);
    return response.data.data;
};