// File: server/src/services/invoiceService.js

import Invoice from "../models/Invoice.js";
import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";


// CREATE INVOICE

export const createInvoice = async (data) => {

    const {
        patient_id,
        appointment_id,
        amount,
        payment_status
    } = data;


    // Check patient exists

    const patient = await Patient.findById(
        patient_id
    );

    if (!patient) {

        throw new Error(
            "PATIENT_NOT_FOUND"
        );

    }


    // Check appointment exists

    const appointment =
        await Appointment.findById(
            appointment_id
        );

    if (!appointment) {

        throw new Error(
            "APPOINTMENT_NOT_FOUND"
        );

    }


    // Appointment must belong to patient

    if (
        Number(appointment.patient_id) !==
        Number(patient_id)
    ) {

        throw new Error(
            "PATIENT_APPOINTMENT_MISMATCH"
        );

    }


    // Amount validation

    if (Number(amount) <= 0) {

        throw new Error(
            "INVALID_AMOUNT"
        );

    }


    // Payment status validation

    if (
        !["pending", "paid"].includes(
            payment_status
        )
    ) {

        throw new Error(
            "INVALID_PAYMENT_STATUS"
        );

    }


    return await Invoice.create(data);

};



// GET ALL INVOICES

export const getInvoices = async () => {

    return await Invoice.findAll();

};



// GET INVOICE BY ID

export const getInvoiceById = async (id) => {

    const invoice =
        await Invoice.findById(id);

    if (!invoice) {

        throw new Error(
            "INVOICE_NOT_FOUND"
        );

    }

    return invoice;

};



// GET PATIENT BY USER ID

export const getPatientByUserId =
async (user_id) => {

    return await Patient.findByUserId(
        user_id
    );

};



// GET INVOICES BY PATIENT ID

export const getInvoicesByPatient =
async (patient_id) => {

    const patient =
        await Patient.findById(
            patient_id
        );

    if (!patient) {

        throw new Error(
            "PATIENT_NOT_FOUND"
        );

    }

    return await Invoice.findByPatientId(
        patient_id
    );

};



// GET INVOICES BY USER ID

export const getInvoicesByUserId =
async (user_id) => {

    const patient =
        await Patient.findByUserId(
            user_id
        );

    if (!patient) {

        throw new Error(
            "PATIENT_NOT_FOUND"
        );

    }

    return await Invoice.findByPatientId(
        patient.id
    );

};



// UPDATE INVOICE

export const updateInvoice =
async (id, data) => {

    const invoice =
        await Invoice.findById(id);

    if (!invoice) {

        throw new Error(
            "INVOICE_NOT_FOUND"
        );

    }


    if (Number(data.amount) <= 0) {

        throw new Error(
            "INVALID_AMOUNT"
        );

    }


    if (
        !["pending", "paid"].includes(
            data.payment_status
        )
    ) {

        throw new Error(
            "INVALID_PAYMENT_STATUS"
        );

    }


    return await Invoice.update(
        id,
        data
    );

};



// DELETE INVOICE

export const deleteInvoice =
async (id) => {

    const invoice =
        await Invoice.findById(id);

    if (!invoice) {

        throw new Error(
            "INVOICE_NOT_FOUND"
        );

    }

    await Invoice.delete(id);

};