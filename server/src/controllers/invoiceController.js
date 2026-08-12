// File: src/controllers/invoiceController.js

import * as invoiceService from "../services/invoiceService.js";



// CREATE INVOICE
export const createInvoice = async (
    req,
    res,
    next
) => {

    try {

        const invoice =
            await invoiceService.createInvoice(
                req.body
            );

        return res.status(201).json({

            success: true,

            message: "Invoice created successfully.",

            data: invoice

        });

    } catch (error) {

        switch (error.message) {

            case "PATIENT_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Patient not found."
                });

            case "APPOINTMENT_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Appointment not found."
                });

            case "PATIENT_APPOINTMENT_MISMATCH":
                return res.status(400).json({
                    success: false,
                    message: "Appointment does not belong to the selected patient."
                });

            case "INVALID_AMOUNT":
                return res.status(400).json({
                    success: false,
                    message: "Amount must be greater than zero."
                });

            case "INVALID_PAYMENT_STATUS":
                return res.status(400).json({
                    success: false,
                    message: "Payment status must be either 'pending' or 'paid'."
                });

            default:
                next(error);

        }

    }

};




// GET ALL INVOICES
export const getInvoices = async (
    req,
    res,
    next
) => {

    try {

        const invoices =
            await invoiceService.getInvoices();

        return res.status(200).json({

            success: true,

            data: invoices

        });

    } catch (error) {

        next(error);

    }

};




// GET INVOICE BY ID
export const getInvoiceById = async (
    req,
    res,
    next
) => {

    try {

        const invoice =
            await invoiceService.getInvoiceById(
                req.params.id
            );

        return res.status(200).json({

            success: true,

            data: invoice

        });

    } catch (error) {

        if (error.message === "INVOICE_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Invoice not found."

            });

        }

        next(error);

    }

};




// GET INVOICES BY PATIENT

export const getInvoicesByPatient = async (
    req,
    res,
    next
) => {

    try {

        const requestedPatientId =
            Number(req.params.patient_id);


        // ==========================
        // PATIENT ACCESS CONTROL
        // ==========================

        if (req.user.role === "patient") {

            const patient =
                await invoiceService.getPatientByUserId(
                    req.user.id
                );


            if (!patient) {

                return res.status(404).json({

                    success: false,

                    message: "Patient profile not found."

                });

            }


            // Patient can only access own invoices

            if (
                Number(patient.id) !==
                requestedPatientId
            ) {

                return res.status(403).json({

                    success: false,

                    message: "Access denied."

                });

            }

        }


        const invoices =
            await invoiceService.getInvoicesByPatient(
                requestedPatientId
            );


        return res.status(200).json({

            success: true,

            data: invoices

        });


    } catch (error) {

        if (
            error.message ===
            "PATIENT_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message: "Patient not found."

            });

        }


        next(error);

    }

};

// UPDATE INVOICE
export const updateInvoice = async (
    req,
    res,
    next
) => {

    try {

        const invoice =
            await invoiceService.updateInvoice(
                req.params.id,
                req.body
            );

        return res.status(200).json({

            success: true,

            message: "Invoice updated successfully.",

            data: invoice

        });

    } catch (error) {

        switch (error.message) {

            case "INVOICE_NOT_FOUND":
                return res.status(404).json({
                    success: false,
                    message: "Invoice not found."
                });

            case "INVALID_AMOUNT":
                return res.status(400).json({
                    success: false,
                    message: "Amount must be greater than zero."
                });

            case "INVALID_PAYMENT_STATUS":
                return res.status(400).json({
                    success: false,
                    message: "Payment status must be either 'pending' or 'paid'."
                });

            default:
                next(error);

        }

    }

};




// DELETE INVOICE
export const deleteInvoice = async (
    req,
    res,
    next
) => {

    try {

        await invoiceService.deleteInvoice(
            req.params.id
        );

        return res.status(200).json({

            success: true,

            message: "Invoice deleted successfully."

        });

    } catch (error) {

        if (error.message === "INVOICE_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Invoice not found."

            });

        }

        next(error);

    }

};