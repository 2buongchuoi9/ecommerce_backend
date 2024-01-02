import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import accessCon from "../controllers/access.controller.js"
import passport from "../auth/auth.passport.js"
import { checkRefreshToken } from "../auth/authUtils.js"
import { apikey, permission, authentication, permissionRole } from "../auth/checkAuth.js"
import { RoleShop } from "../helpers/constans.js"
import categoryController from "../controllers/category.controller.js"
const router = express.Router()

router.get("/", asyncHandler(categoryController.getAllCategory))

// authentication
router.use(authentication)

router.post("/", permissionRole(RoleShop.ADMIN), asyncHandler(categoryController.addCategoryByAdmin))

router.patch("/:cateId", permissionRole(RoleShop.ADMIN), asyncHandler(categoryController.updateCategoryByAdmin))

export default router
