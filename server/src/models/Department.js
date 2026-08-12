// File: src/models/Department.js

import pool from "../config/database.js";

const Department = {

    async create(data) {

        const { name, description } = data;

        const result = await pool.query(
            `
            INSERT INTO departments
            (
                name,
                description
            )
            VALUES
            ($1, $2)
            RETURNING *
            `,
            [name, description]
        );

        return result.rows[0];
    },

    async findAll() {

        const result = await pool.query(
            `
            SELECT *
            FROM departments
            ORDER BY id ASC
            `
        );

        return result.rows;
    },

    async findById(id) {

        const result = await pool.query(
            `
            SELECT *
            FROM departments
            WHERE id = $1
            `,
            [id]
        );

        return result.rows[0];
    },

    async update(id, data) {

        const { name, description } = data;

        const result = await pool.query(
            `
            UPDATE departments
            SET
                name = $1,
                description = $2
            WHERE id = $3
            RETURNING *
            `,
            [name, description, id]
        );

        return result.rows[0];
    },

    async delete(id) {

        await pool.query(
            `
            DELETE FROM departments
            WHERE id = $1
            `,
            [id]
        );

    }

};

export default Department;