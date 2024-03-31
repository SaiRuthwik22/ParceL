import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    product:[{
        productId:
        {
            type:Schema.Types.ObjectId,
            ref : "Product"
        },
        quantity:{
            type:Number
        }
    }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{_id:false})

export const Cart = mongoose.model("Cart", cartSchema)