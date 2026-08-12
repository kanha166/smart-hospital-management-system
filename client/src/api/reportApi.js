import api from "./axios";

export const getReports = async () => {
    const response = await api.get("/lab-reports");
    return response.data.data;
};

export const getReportById = async (id) => {
    const response = await api.get(`/lab-reports/${id}`);
    return response.data.data;
};

export const createReport = async (formData) => {
    const response = await api.post("/lab-reports", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const updateReport = async (id, formData) => {
    const response = await api.put(`/lab-reports/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });

    return response.data;
};

export const deleteReport = async (id) => {
    const response = await api.delete(`/lab-reports/${id}`);
    return response.data;
};

// GET MY REPORTS
export const getMyReports = async () => {

    const response =
        await api.get("/lab-reports/my");

    return response.data.data;

};