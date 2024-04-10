import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

//importing routes

import userRoutes from "./routes/user.routes.js"
import cartRoutes from "./routes/cart.routes.js"
//using routes

app.use("/api/v1/users", userRoutes)
app.use("/api/v1/cart",cartRoutes)


export {app}