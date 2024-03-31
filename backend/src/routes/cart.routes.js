import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { getCart,addItemToCart,deleteItemInCart} from "../controllers/cart.controller.js";
import { getProducts } from "../controllers/product.controller.js";

const router = Router()

router.use(verifyJwt)

router.route("/additem").post(addItemToCart)
router.route("/deleteitem").post(deleteItemInCart)
router.route("/cart").get(getCart)
router.route("/products").get(getProducts)

export default router