import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import checkoutController from "../controllers/checkout.controller.js"
const router = express.Router()
// /cart

router.post("/review", asyncHandler(checkoutController.checkoutReview))

export default router
