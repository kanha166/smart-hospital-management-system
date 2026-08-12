// File: src/models/Invoice.js

import pool from "../config/database.js";


const Invoice = {


    async create(data) {

        const {
            patient_id,
            appointment_id,
            amount,
            payment_status,
            payment_method
        } = data;


        const result = await pool.query(
            `
            INSERT INTO invoices
            (
                patient_id,
                appointment_id,
                amount,
                payment_status,
                payment_method
            )
            VALUES
            ($1, $2, $3, $4, $5)
            RETURNING *
            `,
            [
                patient_id,
                appointment_id,
                amount,
                payment_status,
                payment_method
            ]
        );


        return result.rows[0];

    },



    async findAll() {

        const result = await pool.query(
            `
            SELECT
                invoices.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name

            FROM invoices

            JOIN patients
            ON invoices.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN appointments
            ON invoices.appointment_id = appointments.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            ORDER BY invoices.id DESC
            `
        );


        return result.rows;

    },



    async findById(id) {

        const result = await pool.query(
            `
            SELECT
                invoices.*,

                patients_users.name AS patient_name,
                doctors_users.name AS doctor_name

            FROM invoices

            JOIN patients
            ON invoices.patient_id = patients.id

            JOIN users patients_users
            ON patients.user_id = patients_users.id

            JOIN appointments
            ON invoices.appointment_id = appointments.id

            JOIN doctors
            ON appointments.doctor_id = doctors.id

            JOIN users doctors_users
            ON doctors.user_id = doctors_users.id

            WHERE invoices.id = $1
            `,
            [id]
        );


        return result.rows[0];

    },



    async findByPatientId(patient_id) {

        const result = await pool.query(
            `
            SELECT *
            FROM invoices
            WHERE patient_id = $1
            ORDER BY id DESC
            `,
            [patient_id]
        );


        return result.rows;

    },



    async update(id, data) {

        const {
            amount,
            payment_status,
            payment_method
        } = data;


        const result = await pool.query(
            `
            UPDATE invoices

            SET
                amount = $1,
                payment_status = $2,
                payment_method = $3

            WHERE id = $4

            RETURNING *
            `,
            [
                amount,
                payment_status,
                payment_method,
                id
            ]
        );


        return result.rows[0];

    },



    async delete(id) {

        await pool.query(
            `
            DELETE FROM invoices
            WHERE id = $1
            `,
            [id]
        );

    }


};


export default Invoice;