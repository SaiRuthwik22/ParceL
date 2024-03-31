import { Router } from "express";
import { registerUser,loginUser,logoutUser,updateDetails,getCurrentUser,changePassword,refreshAccessToken } from "../controllers/user.controller.js";
import {verifyJwt} from "../middlewares/auth.middleware.js"
import multer from "multer"

const router = Router()
const upload = multer()

router.route("/register").post(upload.none(),registerUser)
router.route("/login").post(upload.none(),loginUser)
router.route("/logout").post(verifyJwt,logoutUser)
router.route("/updatedetails",).post(verifyJwt,updateDetails)
router.route("/currentuser").get(verifyJwt,getCurrentUser)
router.route("/changepassword").post(verifyJwt,changePassword)
router.route("/refreshaccess").post(refreshAccessToken)


export default router