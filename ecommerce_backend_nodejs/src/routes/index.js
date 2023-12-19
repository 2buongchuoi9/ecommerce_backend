import accessRouter from "./access.router.js"
import productRouter from "./product.router.js"
import cartRouter from "./cart.router.js"
import checkoutRouter from "./checkout.router.js"
import discountRouter from "./discount.router.js"
import commentRouter from "./comment.router.js"
import authRouter from "./auth.router.js"
import { apikey, permission } from "../auth/checkAuth.js"
import session from "express-session"
import passport from "../auth/auth.passport.js"

const route = (app) => {
    app.use("/auth", authRouter)

    // check apikey
    app.use(apikey)

    // check permission
    app.use(permission("0000"))

    app.use("/product", productRouter)

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
