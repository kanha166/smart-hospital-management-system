// File: src/controllers/prescriptionController.js

import * as prescriptionService
    from "../services/prescriptionService.js";


// ==========================
// CREATE PRESCRIPTION
// ==========================

export const createPrescription = async (
    req,
    res,
    next
) => {

    try {

        const prescription =
            await prescriptionService.createPrescription(
                req.body
            );


        return res.status(201).json({

            success: true,

            message:
                "Prescription created successfully.",

            data: prescription

        });

    } catch (error) {

        if (
            error.message ===
            "APPOINTMENT_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Appointment not found."

            });

        }


        next(error);

    }

};


// ==========================
// GET ALL PRESCRIPTIONS
// ==========================

export const getPrescriptions = async (
    req,
    res,
    next
) => {

    try {

        const prescriptions =
            await prescriptionService.getPrescriptions();


        return res.status(200).json({

            success: true,

            data: prescriptions

        });

    } catch (error) {

        next(error);

    }

};


// ==========================
// GET PRESCRIPTION BY ID
// ==========================

export const getPrescriptionById = async (
    req,
    res,
    next
) => {

    try {

        const prescription =
            await prescriptionService.getPrescriptionById(
                req.params.id
            );


        return res.status(200).json({

            success: true,

            data: prescription

        });

    } catch (error) {

        if (
            error.message ===
            "PRESCRIPTION_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Prescription not found."

            });

        }


        next(error);

    }

};


// ==========================
// GET PRESCRIPTIONS BY APPOINTMENT
// ==========================

export const getPrescriptionsByAppointment =
async (
    req,
    res,
    next
) => {

    try {

        const prescriptions =
            await prescriptionService
                .getPrescriptionsByAppointment(
                    req.params.appointment_id
                );


        return res.status(200).json({

            success: true,

            data: prescriptions

        });

    } catch (error) {

        if (
            error.message ===
            "APPOINTMENT_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Appointment not found."

            });

        }


        next(error);

    }

};


// ==========================
// UPDATE PRESCRIPTION
// ==========================

export const updatePrescription = async (
    req,
    res,
    next
) => {

    try {

        const prescription =
            await prescriptionService.updatePrescription(
                req.params.id,
                req.body
            );


        return res.status(200).json({

            success: true,

            message:
                "Prescription updated successfully.",

            data: prescription

        });

    } catch (error) {

        if (
            error.message ===
            "PRESCRIPTION_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Prescription not found."

            });

        }


        next(error);

    }

};


// ==========================
// DELETE PRESCRIPTION
// ==========================

export const deletePrescription = async (
    req,
    res,
    next
) => {

    try {

        await prescriptionService.deletePrescription(
            req.params.id
        );


        return res.status(200).json({

            success: true,

            message:
                "Prescription deleted successfully."

        });

    } catch (error) {

        if (
            error.message ===
            "PRESCRIPTION_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Prescription not found."

            });

        }


        next(error);

    }

};

// ==========================
// GET PATIENT PRESCRIPTIONS
// BY APPOINTMENT
// ==========================

export const getPatientPrescriptionsByAppointment =
async (
    req,
    res,
    next
) => {

    try {

        const prescriptions =
            await prescriptionService
                .getPatientPrescriptionsByAppointment(
                    req.params.appointment_id,
                    req.user.id
                );


        return res.status(200).json({

            success: true,

            data: prescriptions

        });

    } catch (error) {

        if (
            error.message ===
            "APPOINTMENT_NOT_FOUND"
        ) {

            return res.status(404).json({

                success: false,

                message:
                    "Appointment not found."

            });

        }


        next(error);

    }

};