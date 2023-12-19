import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import cartController from "../controllers/cart.controller.js"
const router = express.Router()
// /cart

router.post("/", asyncHandler(cartController.addToCart))
router.delete("/", asyncHandler(cartController.removeItemToCart))
router.post("/update", asyncHandler(cartController.updateCart))
router.get("/", asyncHandler(cartController.getListToCart))

export default router
