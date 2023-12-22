import express from "express"
import session from "express-session"
import passport from "../auth/auth.passport.js"
import { authentication } from "../auth/checkAuth.js"
import accessController from "../controllers/access.controller.js"
import { asyncHandler } from "../helpers/handerHelpper.js"

const router = express.Router()

router.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
)
router.use(passport.initialize())
router.use(passport.session())

router.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))

router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }))

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: "/auth/google/success",
        failureRedirect: "/auth/google/failure",
    })
)
router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: "/auth/facebook/success",
        failureRedirect: "/auth/facebook/failure",
    })
)

router.get("/google/failure", (req, res, next) => {
    console.log(req?.user)
    res.send("failure")
})

// router.use(authentication)

router.get("/google/success", asyncHandler(accessController.loginWithOauth2))

router.get("/facebook/success", asyncHandler(accessController.loginWithOauth2))

export default router
