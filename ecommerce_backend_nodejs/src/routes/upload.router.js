import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import uploadController from "../controllers/upload.controller.js"
import { uploadDisk, uploadMemory } from "../config/multer.config.js"
import { apikey, permission, authentication, permissionRole } from "../auth/checkAuth.js"
import { RoleShop } from "../helpers/constans.js"
const router = express.Router()

// authentication
// router.use(authentication)
// router.use(permissionRole(RoleShop.SHOP))

router.post("/", asyncHandler(uploadController.upLoadfileFromUrl))

router.use(authentication)

router.post("/thumb", uploadDisk.single("file"), asyncHandler(uploadController.upLoadfile))

// upload s3
router.post("/bucket", uploadMemory.single("file"), asyncHandler(uploadController.uploadImageFromLocalS3))

export default router
