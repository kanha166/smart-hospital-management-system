import pool from "../config/database.js";


const Role = {


async findByName(role_name){

const result =
await pool.query(
`
SELECT *
FROM roles
WHERE role_name=$1
`,
[role_name]
);


return result.rows[0];

},

async findById(role_id){

const result =
await pool.query(
`
SELECT *
FROM roles
WHERE role_id=$1
`,
[role_id]
);


return result.rows[0];

}

};


export default Role;