// File: src/models/Consultation.js

import pool from "../config/database.js";


const Consultation = {


    async create(data) {

        const {
            appointment_id,
            notes,
            diagnosis
        } = data;


        const result = await pool.query(
            `
            INSERT INTO consultations
            (
                appointment_id,
                notes,
                diagnosis
            )
            VALUES
            ($1, $2, $3)
            RETURNING *
            `,
            [
                appointment_id,
                notes,
                diagnosis
            ]
        );


        return result.rows[0];

    },



    async findAll() {

        const result = await pool.query(
            `
            SELECT
                consultations.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name

            FROM consultations

            JOIN appointments
            ON consultations.appointment_id = appointments.id

            JOIN patients
            ON appointments.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            ORDER BY consultations.created_at DESC
            `
        );


        return result.rows;

    },



    async findById(id) {

        const result = await pool.query(
            `
            SELECT
                consultations.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name

            FROM consultations

            JOIN appointments
            ON consultations.appointment_id = appointments.id

            JOIN patients
            ON appointments.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            WHERE consultations.id = $1
            `,
            [id]
        );


        return result.rows[0];

    },



    async findByAppointmentId(appointment_id) {

        const result = await pool.query(
            `
            SELECT *
            FROM consultations
            WHERE appointment_id = $1
            `,
            [appointment_id]
        );


        return result.rows[0];

    },



    async update(id, data) {

        const {
            notes,
            diagnosis
        } = data;


        const result = await pool.query(
            `
            UPDATE consultations

            SET
                notes = $1,
                diagnosis = $2

            WHERE id = $3

            RETURNING *
            `,
            [
                notes,
                diagnosis,
                id
            ]
        );


        return result.rows[0];

    },



    async delete(id) {

        await pool.query(
            `
            DELETE FROM consultations
            WHERE id = $1
            `,
            [id]
        );

    }


};


export default Consultation;