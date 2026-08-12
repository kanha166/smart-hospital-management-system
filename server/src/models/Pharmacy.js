// File: src/models/Pharmacy.js

import pool from "../config/database.js";

const Pharmacy = {

    async create(data) {

        const {
            medicine_name,
            manufacturer,
            category,
            stock_quantity,
            unit_price,
            expiry_date
        } = data;

        const { rows } = await pool.query(
            `
            INSERT INTO pharmacy_inventory
            (
                medicine_name,
                manufacturer,
                category,
                stock_quantity,
                unit_price,
                expiry_date
            )
            VALUES
            ($1,$2,$3,$4,$5,$6)
            RETURNING *;
            `,
            [
                medicine_name,
                manufacturer,
                category,
                stock_quantity,
                unit_price,
                expiry_date
            ]
        );

        return rows[0];

    },



    async findAll() {

        const { rows } = await pool.query(
            `
            SELECT *
            FROM pharmacy_inventory
            ORDER BY id DESC;
            `
        );

        return rows;

    },



    async findById(id) {

        const { rows } = await pool.query(
            `
            SELECT *
            FROM pharmacy_inventory
            WHERE id = $1;
            `,
            [id]
        );

        return rows[0];

    },



    async update(id, data) {

        const {
            medicine_name,
            manufacturer,
            category,
            stock_quantity,
            unit_price,
            expiry_date
        } = data;

        const { rows } = await pool.query(
            `
            UPDATE pharmacy_inventory

            SET
                medicine_name = $1,
                manufacturer = $2,
                category = $3,
                stock_quantity = $4,
                unit_price = $5,
                expiry_date = $6

            WHERE id = $7

            RETURNING *;
            `,
            [
                medicine_name,
                manufacturer,
                category,
                stock_quantity,
                unit_price,
                expiry_date,
                id
            ]
        );

        return rows[0];

    },



    async delete(id) {

        await pool.query(
            `
            DELETE FROM pharmacy_inventory
            WHERE id = $1;
            `,
            [id]
        );

    }

};

export default Pharmacy;