// File: src/models/Appointment.js

import pool from "../config/database.js";

const Appointment = {

    // CREATE APPOINTMENT
    async create(data) {

        const {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            reason,
            booking_source
        } = data;

        const result = await pool.query(
            `
            INSERT INTO appointments
            (
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time,
                reason,
                status,
                booking_source
            )
            VALUES
            ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
            `,
            [
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time,
                reason,
                "pending",
                booking_source || "admin"
            ]
        );

        return result.rows[0];
    },


    // GET ALL APPOINTMENTS
    async findAll() {

        const result = await pool.query(
            `
            SELECT
                appointments.*,

                patients.id AS patient_id,
                patient_users.name AS patient_name,

                doctors.id AS doctor_id,
                doctor_users.name AS doctor_name,

                departments.name AS department_name

            FROM appointments

            JOIN patients
                ON appointments.patient_id = patients.id

            JOIN users AS patient_users
                ON patients.user_id = patient_users.id

            JOIN doctors
                ON appointments.doctor_id = doctors.id

            JOIN users AS doctor_users
                ON doctors.user_id = doctor_users.id

            LEFT JOIN departments
                ON doctors.department_id = departments.id

            ORDER BY
                appointments.appointment_date DESC,
                appointments.appointment_time ASC;
            `
        );

        return result.rows;
    },


    // GET APPOINTMENT BY ID
    async findById(id) {

        const result = await pool.query(
            `
            SELECT
                appointments.*,

                patient_users.name AS patient_name,
                doctor_users.name AS doctor_name,
                departments.name AS department_name

            FROM appointments

            JOIN patients
                ON appointments.patient_id = patients.id

            JOIN users AS patient_users
                ON patients.user_id = patient_users.id

            JOIN doctors
                ON appointments.doctor_id = doctors.id

            JOIN users AS doctor_users
                ON doctors.user_id = doctor_users.id

            LEFT JOIN departments
                ON doctors.department_id = departments.id

            WHERE appointments.id = $1;
            `,
            [id]
        );

        return result.rows[0];
    },


    // GET PATIENT APPOINTMENTS
    async findByPatientId(patient_id) {

        const result = await pool.query(
            `
            SELECT
                appointments.*,

                doctor_users.name AS doctor_name,
                departments.name AS department_name

            FROM appointments

            JOIN doctors
                ON appointments.doctor_id = doctors.id

            JOIN users AS doctor_users
                ON doctors.user_id = doctor_users.id

            LEFT JOIN departments
                ON doctors.department_id = departments.id

            WHERE appointments.patient_id = $1

            ORDER BY
                appointments.appointment_date DESC,
                appointments.appointment_time DESC;
            `,
            [patient_id]
        );

        return result.rows;
    },


    // UPDATE APPOINTMENT
    // Used by existing Admin appointment functionality
    async update(id, data) {

        const {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            reason,
            status
        } = data;

        const result = await pool.query(
            `
            UPDATE appointments

            SET
                patient_id = $1,
                doctor_id = $2,
                appointment_date = $3,
                appointment_time = $4,
                reason = $5,
                status = $6

            WHERE id = $7

            RETURNING *
            `,
            [
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time,
                reason,
                status,
                id
            ]
        );

        return result.rows[0];
    },


    // DELETE APPOINTMENT
    async delete(id) {

        await pool.query(
            `
            DELETE FROM appointments
            WHERE id = $1;
            `,
            [id]
        );
    },


    // GET APPOINTMENTS FOR LOGGED-IN DOCTOR
    async findByDoctorId(doctorId) {

        const result = await pool.query(
            `
            SELECT
                appointments.*,

                patient_users.name AS patient_name,

                departments.name AS department_name

            FROM appointments

            JOIN patients
                ON appointments.patient_id = patients.id

            JOIN users AS patient_users
                ON patients.user_id = patient_users.id

            JOIN doctors
                ON appointments.doctor_id = doctors.id

            LEFT JOIN departments
                ON doctors.department_id = departments.id

            WHERE appointments.doctor_id = $1

            ORDER BY
                appointments.appointment_date ASC,
                appointments.appointment_time ASC
            `,
            [doctorId]
        );

        return result.rows;
    },


    // DOCTOR ACCEPT / REJECT / CHANGE DATE / CHANGE TIME
    async updateDoctorAppointment(id, data) {

        const {
            appointment_date,
            appointment_time,
            status
        } = data;

        const result = await pool.query(
            `
            UPDATE appointments

            SET
                appointment_date = $1,
                appointment_time = $2,
                status = $3

            WHERE id = $4

            RETURNING *
            `,
            [
                appointment_date,
                appointment_time,
                status,
                id
            ]
        );

        return result.rows[0];
    }

};

export default Appointment;