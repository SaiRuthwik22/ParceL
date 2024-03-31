import { app } from "./app.js";
import { db_connection } from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({path:"./.env"})

db_connection().then(
    app.listen(8000,(req,res)=>{
        console.log("server is ready at port num 8000")
    })
)
.catch((err)=>{
    console.log("error while connecting to database")
    process.exit(1)
})