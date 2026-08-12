// File: src/models/Prescription.js

import pool from "../config/database.js";

const Prescription = {

    // ==========================
    // CREATE PRESCRIPTION
    // ==========================

    async create(data) {

        const {
            appointment_id,
            medicine_name,
            dosage,
            duration,
            instructions
        } = data;

        const result = await pool.query(
            `
            INSERT INTO prescriptions
            (
                appointment_id,
                medicine_name,
                dosage,
                duration,
                instructions
            )
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                appointment_id,
                medicine_name,
                dosage,
                duration,
                instructions
            ]
        );


        return result.rows[0];

    },


    // ==========================
    // GET ALL PRESCRIPTIONS
    // ==========================

    async findAll() {

        const result = await pool.query(
            `
            SELECT
                prescriptions.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name,

                appointments.appointment_date,
                appointments.appointment_time

            FROM prescriptions

            JOIN appointments
            ON prescriptions.appointment_id = appointments.id

            JOIN patients
            ON appointments.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            ORDER BY
                appointments.appointment_date DESC,
                appointments.appointment_time DESC,
                prescriptions.id DESC
            `
        );


        return result.rows;

    },


    // ==========================
    // GET PRESCRIPTION BY ID
    // ==========================

    async findById(id) {

        const result = await pool.query(
            `
            SELECT
                prescriptions.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name,

                appointments.appointment_date,
                appointments.appointment_time

            FROM prescriptions

            JOIN appointments
            ON prescriptions.appointment_id = appointments.id

            JOIN patients
            ON appointments.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            WHERE prescriptions.id = $1
            `,
            [id]
        );


        return result.rows[0];

    },


    // ==========================
    // GET BY APPOINTMENT ID
    // ==========================

    async findByAppointmentId(appointment_id) {

        const result = await pool.query(
            `
            SELECT
                prescriptions.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name,

                appointments.appointment_date,
                appointments.appointment_time

            FROM prescriptions

            JOIN appointments
            ON prescriptions.appointment_id = appointments.id

            JOIN patients
            ON appointments.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            WHERE prescriptions.appointment_id = $1

            ORDER BY prescriptions.id ASC
            `,
            [appointment_id]
        );


        return result.rows;

    },


    // ==========================
    // GET BY APPOINTMENT
    // FOR CURRENT PATIENT ONLY
    // ==========================

    async findByAppointmentIdForPatient(
        appointment_id,
        user_id
    ) {

        const result = await pool.query(
            `
            SELECT
                prescriptions.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name,

                appointments.appointment_date,
                appointments.appointment_time

            FROM prescriptions

            JOIN appointments
            ON prescriptions.appointment_id = appointments.id

            JOIN patients
            ON appointments.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            WHERE prescriptions.appointment_id = $1
            AND patients.user_id = $2

            ORDER BY prescriptions.id ASC
            `,
            [
                appointment_id,
                user_id
            ]
        );


        return result.rows;

    },


    // ==========================
    // UPDATE PRESCRIPTION
    // ==========================

    async update(id, data) {

        const {
            medicine_name,
            dosage,
            duration,
            instructions
        } = data;


        const result = await pool.query(
            `
            UPDATE prescriptions

            SET
                medicine_name = $1,
                dosage = $2,
                duration = $3,
                instructions = $4

            WHERE id = $5

            RETURNING *
            `,
            [
                medicine_name,
                dosage,
                duration,
                instructions,
                id
            ]
        );


        return result.rows[0];

    },


    // ==========================
    // DELETE PRESCRIPTION
    // ==========================

    async delete(id) {

        await pool.query(
            `
            DELETE FROM prescriptions

            WHERE id = $1
            `,
            [id]
        );

    }

};


export default Prescription;