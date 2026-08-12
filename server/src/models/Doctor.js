import pool from "../config/database.js";

const Doctor = {

    async create(data) {

        const {
            user_id,
            department_id,
            specialization,
            qualification,
            doctor_image,
            experience
        } = data;

        const result = await pool.query(
            `
            INSERT INTO doctors
            (
                user_id,
                department_id,
                specialization,
                qualification,
                doctor_image,
                experience
            )
            VALUES
            ($1,$2,$3,$4,$5,$6)
            RETURNING *;
            `,
            [
                user_id,
                department_id,
                specialization,
                qualification,
                doctor_image,
                experience
            ]
        );

        return result.rows[0];

    },


    async findAll() {

        const result = await pool.query(
            `
            SELECT
                doctors.id,
                doctors.user_id,
                doctors.department_id,
                doctors.specialization,
                doctors.qualification,
                doctors.doctor_image,
                doctors.experience,

                users.name,
                users.email,
                users.phone,
                users.gender,
                users.date_of_birth,
                users.address,
                users.emergency_contact,

                departments.name AS department_name

            FROM doctors

            JOIN users
                ON doctors.user_id = users.id

            LEFT JOIN departments
                ON doctors.department_id = departments.id

            ORDER BY doctors.id ASC;
            `
        );

        return result.rows;

    },


    async findById(id) {

        const result = await pool.query(
            `
            SELECT
                doctors.id,
                doctors.user_id,
                doctors.department_id,
                doctors.specialization,
                doctors.qualification,
                doctors.doctor_image,
                doctors.experience,

                users.name,
                users.email,
                users.phone,
                users.gender,
                users.date_of_birth,
                users.address,
                users.emergency_contact,

                departments.name AS department_name

            FROM doctors

            JOIN users
                ON doctors.user_id = users.id

            LEFT JOIN departments
                ON doctors.department_id = departments.id

            WHERE doctors.id = $1;
            `,
            [id]
        );

        return result.rows[0];

    },


    async update(id, data) {

        const {
            department_id,
            specialization,
            qualification,
            doctor_image,
            experience
        } = data;

        const result = await pool.query(
            `
            UPDATE doctors

            SET
                department_id = $1,
                specialization = $2,
                qualification = $3,
                doctor_image = $4,
                experience = $5

            WHERE id = $6

            RETURNING *;
            `,
            [
                department_id,
                specialization,
                qualification,
                doctor_image,
                experience,
                id
            ]
        );

        return result.rows[0];

    },


    async delete(id) {

        await pool.query(
            `
            DELETE FROM doctors
            WHERE id = $1;
            `,
            [id]
        );

    },


    // GET DOCTORS BY DEPARTMENT
    async findByDepartment(departmentId) {

        const result = await pool.query(
            `
            SELECT
                doctors.id,
                users.name
            FROM doctors

            JOIN users
                ON doctors.user_id = users.id

            WHERE doctors.department_id = $1

            ORDER BY users.name ASC;
            `,
            [departmentId]
        );

        return result.rows;

    },

    async findByUserId(userId) {

        const result = await pool.query(
            `
            SELECT *
            FROM doctors
            WHERE user_id = $1
            `,
            [userId]
        );

        return result.rows[0];

    },

    async findByUserId(userId) {

        const result = await pool.query(
            `
            SELECT *
            FROM doctors
            WHERE user_id = $1
            `,
            [userId]
        );

        return result.rows[0];

    },

};

export default Doctor;