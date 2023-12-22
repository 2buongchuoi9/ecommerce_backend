import accessRouter from "./access.router.js"
import productRouter from "./product.router.js"
import cartRouter from "./cart.router.js"
import checkoutRouter from "./checkout.router.js"
import discountRouter from "./discount.router.js"
import commentRouter from "./comment.router.js"
import authRouter from "./auth.router.js"
import uploadRouter from "./upload.router.js"
import { apikey, permission } from "../auth/checkAuth.js"
import session from "express-session"
import passport from "../auth/auth.passport.js"
import keyTokenModel from "../models/keyToken.model.js"
import apikeyModel from "../models/apikey.model.js"
import redisClient from "../database/init.redis.js"

const route = (app) => {
    app.get("/cc", (req, res, next) => {
        apikeyModel.create({
            key: "d9c34385-64f0-4619-b6ef-53c7ddc46be4",
            permissions: ["0000"],
            status: true,
        })
    })

    app.get("/redis", async (req, res, next) => {
        res.send(await redisClient.get("ab"))
    })

    app.use("/auth", authRouter)

    // check apikey
    app.use(apikey)

    // check permission
    app.use(permission("0000"))

    app.use("/product", productRouter)

    app.use("/upload", uploadRouter)

    app.use("/discount", discountRouter)

    app.use("/cart", cartRouter)

    app.use("/checkout", checkoutRouter)

    app.use("/comment", commentRouter)

    app.use("/", accessRouter)

    // app.use("/", (rep, res, next) => {
    //     res.send("home")
    // })
}

export default route
