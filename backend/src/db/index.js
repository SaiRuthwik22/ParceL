import mongoose from "mongoose";
import {ecart} from "../constant.js"

const db_connection = async(req,res)=>{
    try {

        const result = await mongoose.connect(`${process.env.MONGO_URL}/${ecart}`)
        console.log("mongo db connected" , result.connection.host)
        
    } catch (error) {
        console.log("error while conecting to mongodb database")
        process.exit(1)
    }
}

export {db_connection}