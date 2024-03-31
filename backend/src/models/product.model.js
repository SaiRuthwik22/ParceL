import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    id:{
        type: Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        required: true
    },
    rating:{
        rate:
        {
            type:Number
        },
        count:
        {
            type:Number
        }
    }
})

export const Product = mongoose.model("Product",productSchema)