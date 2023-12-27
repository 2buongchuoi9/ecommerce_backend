import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import accessCon from "../controllers/access.controller.js"
import passport from "../auth/auth.passport.js"
import infoService from "../services/info.service.js"
import { checkRefreshToken } from "../auth/authUtils.js"
import { apikey, permission, authentication } from "../auth/checkAuth.js"
import { SuccessResponse } from "../core/success.response.js"
const router = express.Router()

router.get(
    "/access/info",
    asyncHandler(async (req, res, next) => {
        return new SuccessResponse({
            message: "oke",
            metadata: await infoService.getInfo(),
        }).send(res)
    })
)

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
