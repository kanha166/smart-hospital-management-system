import dotenv from "dotenv";
import app from "./app.js";
import pool from "./config/database.js";


dotenv.config();


const PORT = process.env.PORT || 5000;


pool.query("SELECT NOW()")
.then(()=>{
    console.log("Database Ready");
})
.catch((error)=>{
    console.error(error);
});


app.listen(PORT,()=>{

    console.log(
        `Server running on port ${PORT}`
    );

});