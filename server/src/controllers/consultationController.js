// File: src/controllers/consultationController.js

import * as consultationService from "../services/consultationService.js";



// CREATE CONSULTATION
export const createConsultation = async (
    req,
    res,
    next
) => {

    try {


        const consultation =
            await consultationService.createConsultation(
                req.body
            );



        return res.status(201).json({

            success: true,

            message: "Consultation created successfully.",

            data: consultation

        });



    } catch (error) {


        if (error.message === "APPOINTMENT_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Appointment not found."

            });

        }



        if (error.message === "CONSULTATION_ALREADY_EXISTS") {

            return res.status(409).json({

                success: false,

                message: "Consultation already exists for this appointment."

            });

        }



        next(error);

    }

};




// GET ALL CONSULTATIONS
export const getConsultations = async (
    req,
    res,
    next
) => {

    try {


        const consultations =
            await consultationService.getConsultations();



        return res.status(200).json({

            success: true,

            data: consultations

        });



    } catch (error) {

        next(error);

    }

};




// GET CONSULTATION BY ID
export const getConsultationById = async (
    req,
    res,
    next
) => {

    try {


        const consultation =
            await consultationService.getConsultationById(
                req.params.id
            );



        return res.status(200).json({

            success: true,

            data: consultation

        });



    } catch (error) {


        if (error.message === "CONSULTATION_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Consultation not found."

            });

        }



        next(error);

    }

};




// GET CONSULTATION BY APPOINTMENT
export const getConsultationByAppointment = async (
    req,
    res,
    next
) => {

    try {

        const consultation =
            await consultationService.getConsultationByAppointment(
                req.params.appointment_id
            );

        return res.status(200).json({

            success: true,

            data: consultation

        });

    } catch (error) {

        next(error);

    }

};

// UPDATE CONSULTATION
export const updateConsultation = async (
    req,
    res,
    next
) => {

    try {


        const consultation =
            await consultationService.updateConsultation(
                req.params.id,
                req.body
            );



        return res.status(200).json({

            success: true,

            message: "Consultation updated successfully.",

            data: consultation

        });



    } catch (error) {


        if (error.message === "CONSULTATION_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Consultation not found."

            });

        }



        next(error);

    }

};




// DELETE CONSULTATION
export const deleteConsultation = async (
    req,
    res,
    next
) => {

    try {


        await consultationService.deleteConsultation(
            req.params.id
        );



        return res.status(200).json({

            success: true,

            message: "Consultation deleted successfully."

        });



    } catch (error) {


        if (error.message === "CONSULTATION_NOT_FOUND") {

            return res.status(404).json({

                success: false,

                message: "Consultation not found."

            });

        }



        next(error);

    }

};