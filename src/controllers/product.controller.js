import { SuccessResponse } from "../core/success.response.js"
import productService from "../services/product.service.js"

const productController = {
    createProduct: async (req, res, next) => {
        return new SuccessResponse({
            message: "Create new Product is success!!!",
            metadata: await productService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId,
            }),
        }).send(res)
    },

    // QUERY //
    getAllProducts: async (req, res, next) => {
        console.log(req.query)
        return new SuccessResponse({
            message: "Get all products success",
            metadata: await productService.getAllProducts(req.query),
        }).send(res)
    },

    getAllProductByCategoryId: async (req, res, next) => {
        return new SuccessResponse({
            message: "Get product success",
            metadata: await productService.getAllProductByCategoryId(req.query),
        }).send(res)
    },

    getProduct: async (req, res, next) => {
        return new SuccessResponse({
            message: "Get product success",
            metadata: await productService.getOneProduct({ product_id: req.params.productId }),
        }).send(res)
    },

    searchProducts: async (req, res, next) => {
        return new SuccessResponse({
            message: "Get search success",
            metadata: await productService.searchProducts({ keySearch: req.params.keySearch, ...req.query }),
        }).send(res)
    },

    getAllDraftsForShop: async (req, res, next) => {
        return new SuccessResponse({
            message: "Get list draft product is success!!!",
            metadata: await productService.findAllDraftsForShop({ product_shop: req.user.userId }),
        }).send(res)
    },

    getAllPublishForShop: async (req, res, next) => {
        console.log(req.user.userId)

        return new SuccessResponse({
            message: "Get list publish product is success!!!",
            metadata: await productService.findAllPublishForShop({ product_shop: req.user.userId }),
        }).send(res)
    },
    // END QUERY //

    // PUT //
    publishProductByShop: async (req, res, next) => {
        return new SuccessResponse({
            message: "publish product is success!!!",
            metadata: await productService.publishProductByShop({ product_shop: req.user.userId, product_id: req.params.id }),
        }).send(res)
    },
    // END PUT //

    // PACTH //
    updateProduct: async (req, res, next) => {
        return new SuccessResponse({
            message: "update product is success!!!",
            metadata: await productService.updateProduct({
                type: req.body.product_type,
                productId: req.params.productId,
                payload: req.body,
                product_shop: req.user.userId,
            }),
        }).send(res)
    },
    // END PACTH //
}
export default productController
