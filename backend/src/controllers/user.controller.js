import {asyncHandler} from "../middlewares/asyncHandler.js"
import { User } from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessandRefreshTokens = async (userId)=>{
try {
        const user = await User.findById(userId)
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
} catch (error) {
    throw new ApiError(500,"Error while generating access token and refresh token")
}
}

const refreshAccessToken = asyncHandler(async (req,res)=>{
    const incomingrefreshToken = req.cookies?.refreshToken
    if(!incomingrefreshToken){
        return new ApiError(404,"unautorized access")
    }
try {
    
        const decodedToken =  jwt.verify(incomingrefreshToken,process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
        if(!user){
            throw new ApiError(404,"Refresh token expired")
        }
        if(incomingrefreshToken !== user.refreshToken){
            throw new ApiError(401,"login with your email and password")
        }
        const {accessToken,refreshToken} =  await generateAccessandRefreshTokens(user._id)
        console.log(accessToken,"refresh Token ",refreshToken)
         user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false})
    
        return res.status(200)
        .cookie("accessToken",accessToken,{maxAge:3600000})
        .cookie("refreshToken",refreshToken,{maxAge:86400000})
        .json(new ApiResponse(200,{accessToken,refreshToken},"successfully refreshed access and refresh token"))
} catch (error) {
    throw new ApiError(400,"invalid refresh token")
}

})

const registerUser = asyncHandler(async (req,res)=>{
    const {username,email,password} =req.body

    if(!username || !email || !password){
        throw new ApiError(400,"all fields are required")
    }
    const isExisted = await User.findOne({
        $or:[{username},{email}],
    })
    if(isExisted){
        throw new ApiError(400,"username or email already exists")
    }
    const user = await User.create({
        username,
        email,
        password
    })
    user.save()
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"internal error while creating user")
    }

    return res.status(200)
    .json(new ApiResponse(200,createdUser,"created successfully"))
})

const loginUser = asyncHandler(async (req,res)=>{
    const {username,email,password} = req.body
    if(!username && !email){
        throw new ApiError(400,"username or email is required")
    }
    const user  = await User.findOne({
        $or: [{username},{email}]
    })
    if(!user){
        throw new ApiError(400,"Invalid username or email")
    }
    const isValidUser = await user.isPasswordCorrect(password)
    if(!isValidUser){
        throw new ApiError(400,"wrong password")
    }
    const {accessToken,refreshToken} = await generateAccessandRefreshTokens(user._id)
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    return res.status(200)
    .cookie("accessToken",accessToken,{maxAge:30000,secure:true,sameSite: 'None'})
    .cookie("refreshToken",refreshToken,{maxAge:86400000,secure:true,sameSite: 'None'})
    .json(new ApiResponse(200,loggedInUser,"logged in successfully"))
})

const logoutUser = asyncHandler(async (req,res)=>{

    await User.findByIdAndUpdate(req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new:true
        })
        const options = {
            httpOnly:true,
            secure:true
        }
    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"logged out successful"))
})

const updateDetails = asyncHandler(async (req,res)=>{
    const {username,email} = req.body
    if(!username && !email){
        throw new ApiError(400,"provide details to update")
    }
    if(username&&email){
        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set:{
                    username,
                    email
                }
            },{new:true}).select("-password")
    }
    else if(username&&!email){
        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set:{
                    username
                }
            },{new:true}).select("-password")
    }
    else if(!username&&email){
        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set:{
                    email
                }
            },{new:true}).select("-password")
    }
    const updateddetails = await User.findById(req.user?._id).select("-password")

    return res.status(200)
    .json(new ApiResponse(200,updateddetails,"userdetails updated successfully"))
})

const getCurrentUser = asyncHandler(async (req,res)=>{
    return res.status(200)
    .json(new ApiResponse(200,req.user,"userfetched successfully"))
})

const changePassword = asyncHandler(async (req,res)=>{
    const {oldPassword,newPassword} = req.body
    const user = await User.findById(req.user?._id)
    const result = await user.isPasswordCorrect(oldPassword)
    console.log(result)
    if(!result){
        throw new ApiError(404,"password is incorrect")
    }
    user.password = newPassword
    await user.save({validateBeforeSave:false})
    return res.status(200)
    .json(new ApiResponse(200,user,"password changed successfully"))
})


export {registerUser,loginUser,logoutUser,updateDetails,refreshAccessToken,getCurrentUser,changePassword}