// File: src/models/LabReport.js

import pool from "../config/database.js";

const LabReport = {


    async create(data) {

        const {
            patient_id,
            test_name,
            result,
            status,
            report_date,
            report_file
        } = data;


        const query = `
            INSERT INTO lab_reports
            (
                patient_id,
                test_name,
                result,
                status,
                report_date,
                report_file
            )
            VALUES
            ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;


        const values = [
            patient_id,
            test_name,
            result,
            status,
            report_date,
            report_file
        ];


        const { rows } = await pool.query(
            query,
            values
        );


        return rows[0];

    },



    async findAll() {

        const { rows } = await pool.query(
            `
            SELECT
                lab_reports.*,
                users.name AS patient_name

            FROM lab_reports

            JOIN patients
            ON lab_reports.patient_id = patients.id

            JOIN users
            ON patients.user_id = users.id

            ORDER BY lab_reports.id DESC;
            `
        );


        return rows;

    },



    async findById(id) {

        const { rows } = await pool.query(
            `
            SELECT
                lab_reports.*,
                users.name AS patient_name

            FROM lab_reports

            JOIN patients
            ON lab_reports.patient_id = patients.id

            JOIN users
            ON patients.user_id = users.id

            WHERE lab_reports.id = $1;
            `,
            [id]
        );


        return rows[0];

    },



    async findByPatientId(patient_id) {

        const { rows } = await pool.query(
            `
            SELECT *
            FROM lab_reports
            WHERE patient_id = $1
            ORDER BY report_date DESC, id DESC;
            `,
            [patient_id]
        );


        return rows;

    },



    async update(id, data) {

        const {
            test_name,
            result,
            status,
            report_date,
            report_file
        } = data;


        const { rows } = await pool.query(
            `
            UPDATE lab_reports

            SET
                test_name = $1,
                result = $2,
                status = $3,
                report_date = $4,
                report_file = $5

            WHERE id = $6

            RETURNING *;
            `,
            [
                test_name,
                result,
                status,
                report_date,
                report_file,
                id
            ]
        );


        return rows[0];

    },



    async delete(id) {

        await pool.query(
            `
            DELETE FROM lab_reports
            WHERE id = $1;
            `,
            [id]
        );

    }


};

export default LabReport;