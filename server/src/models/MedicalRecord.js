// File: src/models/MedicalRecord.js

import pool from "../config/database.js";

const MedicalRecord = {

    async create(data) {

        const {
            patient_id,
            consultation_id,
            allergies,
            chronic_diseases,
            surgeries,
            family_history,
            medical_history,
            notes
        } = data;

        const { rows } = await pool.query(
            `
            INSERT INTO medical_records
            (
                patient_id,
                consultation_id,
                allergies,
                chronic_diseases,
                surgeries,
                family_history,
                medical_history,
                notes
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;
            `,
            [
                patient_id,
                consultation_id,
                allergies,
                chronic_diseases,
                surgeries,
                family_history,
                medical_history,
                notes
            ]
        );

        return rows[0];

    },



    async findAll() {

        const { rows } = await pool.query(
            `
            SELECT
                mr.*,
                u.name AS patient_name

            FROM medical_records mr

            JOIN patients p
                ON mr.patient_id = p.id

            JOIN users u
                ON p.user_id = u.id

            ORDER BY mr.id DESC;
            `
        );

        return rows;

    },



    async findById(id) {

        const { rows } = await pool.query(
            `
            SELECT
                mr.*,
                u.name AS patient_name

            FROM medical_records mr

            JOIN patients p
                ON mr.patient_id = p.id

            JOIN users u
                ON p.user_id = u.id

            WHERE mr.id = $1;
            `,
            [id]
        );

        return rows[0];

    },



    async findByPatientId(patient_id) {

        const { rows } = await pool.query(
            `
            SELECT *
            FROM medical_records
            WHERE patient_id = $1
            ORDER BY id DESC;
            `,
            [patient_id]
        );

        return rows;

    },



    async update(id, data) {

        const {
            consultation_id,
            allergies,
            chronic_diseases,
            surgeries,
            family_history,
            medical_history,
            notes
        } = data;

        const { rows } = await pool.query(
            `
            UPDATE medical_records

            SET
                consultation_id = $1,
                allergies = $2,
                chronic_diseases = $3,
                surgeries = $4,
                family_history = $5,
                medical_history = $6,
                notes = $7

            WHERE id = $8

            RETURNING *;
            `,
            [
                consultation_id,
                allergies,
                chronic_diseases,
                surgeries,
                family_history,
                medical_history,
                notes,
                id
            ]
        );

        return rows[0];

    },



    async delete(id) {

        await pool.query(
            `
            DELETE FROM medical_records
            WHERE id = $1;
            `,
            [id]
        );

    }

};

export default MedicalRecord;