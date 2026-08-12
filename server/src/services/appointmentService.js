// File: src/services/appointmentService.js

import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

// CREATE APPOINTMENT
export const createAppointment = async (data) => {

    const {
        patient_id,
        doctor_id
    } = data;

    const patient =
        await Patient.findById(patient_id);

    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }

    const doctor =
        await Doctor.findById(doctor_id);

    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }

    return await Appointment.create({

        ...data,

        booking_source: "admin"

    });
};
// GET ALL APPOINTMENTS
export const getAppointments = async () => {

    return await Appointment.findAll();

};


// GET APPOINTMENT BY ID
export const getAppointmentById = async (id) => {

    const appointment = await Appointment.findById(id);


    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }


    return appointment;

};


// GET PATIENT APPOINTMENTS
export const getPatientAppointments = async (patient_id) => {

    return await Appointment.findByPatientId(patient_id);

};


// UPDATE APPOINTMENT
export const updateAppointment = async (id, data) => {

    const appointment = await Appointment.findById(id);


    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }


    return await Appointment.update(id, data);

};


// DELETE APPOINTMENT
export const deleteAppointment = async (id) => {

    const appointment = await Appointment.findById(id);


    if (!appointment) {
        throw new Error("APPOINTMENT_NOT_FOUND");
    }


    await Appointment.delete(id);

};

// CREATE PATIENT APPOINTMENT
export const createPatientAppointment = async (user_id, data) => {

    const {
        doctor_id,
        appointment_date,
        appointment_time,
        reason
    } = data;

    const patient =
        await Patient.findByUserId(user_id);

    if (!patient) {
        throw new Error("PATIENT_NOT_FOUND");
    }

    const doctor =
        await Doctor.findById(doctor_id);

    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }

    return await Appointment.create({

        patient_id: patient.id,

        doctor_id,

        appointment_date,

        appointment_time,

        reason,

        status: "pending",

        booking_source: "patient"

    });
};

export const getDoctorAppointments = async (userId) => {

    const doctor =
        await Doctor.findByUserId(userId);

    if (!doctor) {
        throw new Error("DOCTOR_NOT_FOUND");
    }

    return await Appointment.findByDoctorId(
        doctor.id
    );
};

export const updateDoctorAppointment = async (
    doctorUserId,
    id,
    data
) => {

    const appointment =
        await Appointment.findById(id);

    if (!appointment) {

        throw new Error(
            "APPOINTMENT_NOT_FOUND"
        );

    }


    /*
     * Make sure this appointment
     * belongs to the logged-in doctor.
     */

    const doctor =
        await Doctor.findById(
            appointment.doctor_id
        );

    if (
        !doctor ||
        doctor.user_id !== doctorUserId
    ) {

        throw new Error(
            "APPOINTMENT_NOT_ASSIGNED"
        );

    }


    /*
     * Doctor can modify ONLY
     * patient-booked appointments.
     */

    if (
        appointment.booking_source !==
        "patient"
    ) {

        throw new Error(
            "ADMIN_BOOKED_APPOINTMENT"
        );

    }


    return await Appointment.update(
        id,
        {

            patient_id:
                appointment.patient_id,

            doctor_id:
                appointment.doctor_id,

            appointment_date:
                data.appointment_date ??
                appointment.appointment_date,

            appointment_time:
                data.appointment_time ??
                appointment.appointment_time,

            reason:
                appointment.reason,

            status:
                data.status ??
                appointment.status,

            booking_source:
                appointment.booking_source

        }
    );
};