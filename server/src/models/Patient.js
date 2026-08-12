// File: src/models/Patient.js

import pool from "../config/database.js";

const Patient = {

    async create(data) {

        const {
            user_id,
            phone,
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,
            profile_image
        } = data;

        const result = await pool.query(
            `
            INSERT INTO patients
            (
                user_id,
                phone,
                date_of_birth,
                gender,
                blood_group,
                address,
                emergency_contact,
                profile_image
            )
            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *
            `,
            [
                user_id,
                phone,
                date_of_birth,
                gender,
                blood_group,
                address,
                emergency_contact,
                profile_image
            ]
        );

        return result.rows[0];

    },



    async findAll() {

        const result = await pool.query(
            `
            SELECT
                patients.*,
                users.name,
                users.email

            FROM patients

            JOIN users
            ON patients.user_id = users.id

            ORDER BY patients.id ASC
            `
        );

        return result.rows;

    },



    async findById(id) {

        const result = await pool.query(
            `
            SELECT
                patients.*,
                users.name,
                users.email

            FROM patients

            JOIN users
            ON patients.user_id = users.id

            WHERE patients.id = $1
            `,
            [id]
        );

        return result.rows[0];

    },



    // ==========================
    // FIND PATIENT BY USER ID
    // ==========================

    async findByUserId(userId) {

        const result = await pool.query(
            `
            SELECT
                patients.*,
                users.name,
                users.email

            FROM patients

            JOIN users
            ON patients.user_id = users.id

            WHERE patients.user_id = $1
            `,
            [userId]
        );

        return result.rows[0];

    },



    // ==========================
    // UPDATE PATIENT BY USER ID
    // ==========================

    async updateByUserId(userId, data) {

        const {
            phone,
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,
            profile_image
        } = data;

        const result = await pool.query(
            `
            UPDATE patients

            SET
                phone = $1,
                date_of_birth = $2,
                gender = $3,
                blood_group = $4,
                address = $5,
                emergency_contact = $6,
                profile_image = COALESCE($7, profile_image)

            WHERE user_id = $8

            RETURNING *
            `,
            [
                phone,
                date_of_birth,
                gender,
                blood_group,
                address,
                emergency_contact,
                profile_image,
                userId
            ]
        );

        return result.rows[0];

    },



    async update(id, data) {

        const {
            phone,
            date_of_birth,
            gender,
            blood_group,
            address,
            emergency_contact,
            profile_image
        } = data;

        const result = await pool.query(
            `
            UPDATE patients

            SET
                phone = $1,
                date_of_birth = $2,
                gender = $3,
                blood_group = $4,
                address = $5,
                emergency_contact = $6,
                profile_image = $7

            WHERE id = $8

            RETURNING *
            `,
            [
                phone,
                date_of_birth,
                gender,
                blood_group,
                address,
                emergency_contact,
                profile_image,
                id
            ]
        );

        return result.rows[0];

    },



    async delete(id) {

        await pool.query(
            `
            DELETE FROM patients
            WHERE id = $1
            `,
            [id]
        );

    }

};

export default Patient;