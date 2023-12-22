import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import { authentication } from "../auth/checkAuth.js"
import commentController from "../controllers/comment.controller.js"
const router = express.Router()

// authentication
router.use(authentication)

router.post("/", asyncHandler(commentController.addComment))

export default router
