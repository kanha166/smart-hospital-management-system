import pool from "../config/database.js";


const UserRole = {


async assign(user_id, role_id){


const result =
await pool.query(
`
INSERT INTO user_roles
(
user_id,
role_id
)
VALUES
($1,$2)
RETURNING *
`,
[
user_id,
role_id
]
);


return result.rows[0];


},


async findByUserId(user_id){


const result =
await pool.query(
`
SELECT *
FROM user_roles
WHERE user_id=$1
`,
[
user_id
]
);


return result.rows;


}


};


export default UserRole;