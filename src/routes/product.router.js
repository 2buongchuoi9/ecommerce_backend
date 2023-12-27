import express from "express"
import { asyncHandler } from "../helpers/handerHelpper.js"
import productController from "../controllers/product.controller.js"
import { apikey, permission, authentication, permissionRole } from "../auth/checkAuth.js"
import { RoleShop } from "../helpers/constans.js"
const router = express.Router()

router.get("/search/:keySearch", asyncHandler(productController.searchProducts))

/**
 *  @swagger
 *    /api/v1/product/products:
 *      get:
 *        summary: get all product
 *        tags: [Product]
 *        security:
 *          - apiKey: []
 *        parameters:
 *          - name: page
 *            in: query
 *            description: Page number for pagination
 *            required: false
 *            type: integer
 *
 *          - name: limit
 *            in: query
 *            description: Number of items per page
 *            required: false
 *            type: integer
 *
 *          - name: sort
 *            in: query
 *            description: Sorting criteria (e.g., name)
 *            required: false
 *            type: string
 *        responses:
 *          200:
 *            contents:
 *              application/json:
 *                schema:
 *                  $ref: '#components/schemas/Product'
 */
router.get("/products", asyncHandler(productController.getAllProducts))
router.get("/product/:productId", asyncHandler(productController.getProduct))

// authentication
router.use(authentication)
router.use(permissionRole(RoleShop.SHOP))

// QUERY //
router.get("/drafts", asyncHandler(productController.getAllDraftsForShop))
router.get("/publish", asyncHandler(productController.getAllPublishForShop))
// END QUERY //

router.post("/create", asyncHandler(productController.createProduct))
router.post("/publish/:id", asyncHandler(productController.publishProductByShop))
router.patch("/:productId", asyncHandler(productController.updateProduct))

export default router
