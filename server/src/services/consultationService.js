// File: src/services/consultationService.js

import Consultation from "../models/Consultation.js";
import Appointment from "../models/Appointment.js";

// CREATE CONSULTATION
export const createConsultation = async (data) => {

    const {
        appointment_id
    } = data;



    // Check appointment exists
    const appointment =
        await Appointment.findById(
            appointment_id
        );


    if (!appointment) {

        throw new Error("APPOINTMENT_NOT_FOUND");

    }



    // Check consultation already exists
    const existing =
        await Consultation.findByAppointmentId(
            appointment_id
        );


    if (existing) {

        throw new Error(
            "CONSULTATION_ALREADY_EXISTS"
        );

    }



    return await Consultation.create(data);

};




// GET ALL CONSULTATIONS
export const getConsultations = async () => {

    return await Consultation.findAll();

};




// GET CONSULTATION BY ID
export const getConsultationById = async (id) => {

    const consultation =
        await Consultation.findById(id);



    if (!consultation) {

        throw new Error(
            "CONSULTATION_NOT_FOUND"
        );

    }



    return consultation;

};

// GET BY APPOINTMENT ID
export const getConsultationByAppointment =
async (appointment_id) => {

    const consultation =
        await Consultation.findByAppointmentId(
            appointment_id
        );

    return consultation || null;

};

// UPDATE CONSULTATION
export const updateConsultation =
async (id, data) => {


    const consultation =
        await Consultation.findById(id);



    if (!consultation) {

        throw new Error(
            "CONSULTATION_NOT_FOUND"
        );

    }



    return await Consultation.update(
        id,
        data
    );

};




// DELETE CONSULTATION
export const deleteConsultation =
async (id) => {


    const consultation =
        await Consultation.findById(id);



    if (!consultation) {

        throw new Error(
            "CONSULTATION_NOT_FOUND"
        );

    }



    await Consultation.delete(id);

};