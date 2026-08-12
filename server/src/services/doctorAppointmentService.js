import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";


// GET LOGGED-IN DOCTOR APPOINTMENTS

export const getMyDoctorAppointments = async (
    userId
) => {

    const doctor =
        await Doctor.findByUserId(userId);

    if (!doctor) {

        throw new Error("DOCTOR_NOT_FOUND");

    }

    return await Appointment.findByDoctorId(
        doctor.id
    );

};


// UPDATE PATIENT-BOOKED APPOINTMENT

export const updateDoctorAppointment = async (
    userId,
    appointmentId,
    data
) => {

    const doctor =
        await Doctor.findByUserId(userId);

    if (!doctor) {

        throw new Error("DOCTOR_NOT_FOUND");

    }


    const appointment =
        await Appointment.findById(
            appointmentId
        );

    if (!appointment) {

        throw new Error(
            "APPOINTMENT_NOT_FOUND"
        );

    }


    // Appointment must belong to this doctor

    if (
        appointment.doctor_id !== doctor.id
    ) {

        throw new Error(
            "APPOINTMENT_UPDATE_NOT_ALLOWED"
        );

    }


    // IMPORTANT:
    // Doctor can modify only patient-booked
    // appointments.

    if (
        appointment.booking_source !==
        "patient"
    ) {

        throw new Error(
            "APPOINTMENT_UPDATE_NOT_ALLOWED"
        );

    }


    return await Appointment.updateDoctorAppointment(
        appointmentId,
        data
    );

};