import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import accessCon from "../controllers/access.controller.js"
import passport from "../auth/auth.passport.js"
import { checkRefreshToken } from "../auth/authUtils.js"
import { apikey, permission, authentication } from "../auth/checkAuth.js"
const router = express.Router()

router.post("/shop/signup", asyncHandler(accessCon.signUp))

router.post("/shop/login", asyncHandler(accessCon.login))

// nếu muốn refresh token thì phải add merderwear
router.post("/shop/handlerRefreshToken", checkRefreshToken, asyncHandler(accessCon.handlerRefreshToken))

router.post("/shop/createModUser", asyncHandler(accessCon.createModUser))

// authentication
router.use(authentication)

router.post("/shop/logout", asyncHandler(accessCon.logout))

router.post("/shop/converShop", asyncHandler(accessCon.converRoleShop))

export default router
