import pool from "../config/database.js";

const User = {

    async findByEmail(email) {

        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        return result.rows[0];

    },

    async findById(id) {

        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE id = $1
            `,
            [id]
        );

        return result.rows[0];

    },

    async create(data) {

        const {
            name,
            email,
            password_hash,
            role,
            phone,
            gender,
            date_of_birth,
            address,
            emergency_contact
        } = data;

        const result = await pool.query(
            `
            INSERT INTO users
            (
                name,
                email,
                password_hash,
                role,
                phone,
                gender,
                date_of_birth,
                address,
                emergency_contact
            )

            VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)

            RETURNING *;
            `,
            [
                name,
                email,
                password_hash,
                role,
                phone,
                gender,
                date_of_birth,
                address,
                emergency_contact
            ]
        );

        return result.rows[0];

    },

    async update(id,data){

        const{
            name,
            email,
            phone,
            gender,
            date_of_birth,
            address,
            emergency_contact
        }=data;

        const result=await pool.query(
            `
            UPDATE users

            SET
                name=$1,
                email=$2,
                phone=$3,
                gender=$4,
                date_of_birth=$5,
                address=$6,
                emergency_contact=$7

            WHERE id=$8

            RETURNING *;
            `,
            [
                name,
                email,
                phone,
                gender,
                date_of_birth,
                address,
                emergency_contact,
                id
            ]
        );

        return result.rows[0];

    }

};

export default User;