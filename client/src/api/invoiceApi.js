// File: client/src/api/invoiceApi.js

import api from "./axios";


export const getAllInvoices = async () => {

    const response = await api.get("/invoices");

    return response.data.data;

};


export const createInvoice = async (data) => {

    const response = await api.post(
        "/invoices",
        data
    );

    return response.data.data;

};


export const getInvoiceById = async (id) => {

    const response = await api.get(
        `/invoices/${id}`
    );

    return response.data.data;

};


export const updateInvoice = async (
    id,
    data
) => {

    const response = await api.put(
        `/invoices/${id}`,
        data
    );

    return response.data.data;

};


export const deleteInvoice = async (id) => {

    const response = await api.delete(
        `/invoices/${id}`
    );

    return response.data;

};


export const getPatientInvoices = async (
    patientId
) => {

    const response = await api.get(
        `/invoices/patient/${patientId}`
    );

    return response.data.data;

};