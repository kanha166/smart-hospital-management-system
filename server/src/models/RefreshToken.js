import pool from "../config/database.js";


const RefreshToken = {


async create(user_id,token,expires_at){


const result =
await pool.query(
`
INSERT INTO refresh_tokens
(
user_id,
token,
expires_at
)
VALUES
($1,$2,$3)
RETURNING *
`,
[
user_id,
token,
expires_at
]
);


return result.rows[0];


},


async find(token){

const result =
await pool.query(
`
SELECT *
FROM refresh_tokens
WHERE token=$1
`,
[token]
);


return result.rows[0];


},


async revoke(token){

await pool.query(
`
UPDATE refresh_tokens
SET revoked_at=CURRENT_TIMESTAMP
WHERE token=$1
`,
[token]
);


}


};


export default RefreshToken;