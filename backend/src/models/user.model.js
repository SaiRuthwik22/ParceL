import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    username:{
        type:String,
        required: true,
        unique:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String
    }

})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(oldpassword){
    return await bcrypt.compare(oldpassword,this.password)
}

userSchema.methods.generateAccessToken = async function(){
    return jwt.sign({
        _id:this._id,
        username: this.username,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: 3600
    })
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign({
        _id:this._id,
        username:this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: 86400
    })
}

export const User = mongoose.model("User",userSchema)