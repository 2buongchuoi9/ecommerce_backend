import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import discountController from "../controllers/discount.controller.js"
import { apikey, permission, authentication } from "../auth/checkAuth.js"
const router = express.Router()

router.post("/amount", asyncHandler(discountController.getDiscountAmount))
router.get("/products_code", asyncHandler(discountController.getAllProductWithDiscountCode))

// authentication
router.use(authentication)

// QUERY //
router.get("/", asyncHandler(discountController.getAllDiscountCodes))
// END QUERY //
router.post("/", asyncHandler(discountController.createDiscount))

export default router
