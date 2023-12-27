import express from "express"
import accessRouter from "./access.router.js"
import productRouter from "./product.router.js"
import cartRouter from "./cart.router.js"
import checkoutRouter from "./checkout.router.js"
import discountRouter from "./discount.router.js"
import commentRouter from "./comment.router.js"
import categoryRouter from "./category.router.js"
import authRouter from "./auth.router.js"
import testRouter from "./test.router.js"
import uploadRouter from "./upload.router.js"
import { apikey, permission } from "../auth/checkAuth.js"
import apikeyModel from "../models/apikey.model.js"
import redisClient from "../database/init.redis.js"
import { SuccessResponse } from "../core/success.response.js"

const apiversion = "/api/v1"
const router = express.Router()

router.use(apiversion + "/test", testRouter)

router.use(apiversion + "/auth", authRouter)

// check apikey
router.use(apikey)

// check permission
router.use(permission("0000"))

router.use(apiversion + "/product", productRouter)

router.use(apiversion + "/upload", uploadRouter)

router.use(apiversion + "/discount", discountRouter)

router.use(apiversion + "/cart", cartRouter)

router.use(apiversion + "/checkout", checkoutRouter)

router.use(apiversion + "/comment", commentRouter)

router.use(apiversion + "/category", categoryRouter)

router.use(apiversion + "/", accessRouter)

// router.use("/", (rep, res, next) => {
//     res.send("home")
// })

export default router
