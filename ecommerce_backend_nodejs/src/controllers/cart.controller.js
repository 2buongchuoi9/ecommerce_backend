import { CREATE, OK, SuccessResponse } from "../core/success.response.js"
import { BadRequestError } from "../core/error.response.js"
import cartService from "../services/cart.service.js"

const cartController = {
    addToCart: async (req, res, next) => {
        console.log("add cart", req.body)
        const { userId, product } = req.body
        const { productId } = product

        if (!productId) throw new BadRequestError("productId must require")

        return new SuccessResponse({
            message: "add to cart success",
            metadata: await cartService.addToCart({ userId, product }),
        }).send(res)
    },

    /**
     * @description
     * @param {*} userId
     * @param {Array} shop_order_ids
     * @returns
     */
    updateCart: async (req, res, next) => {
        const { userId, shop_order_ids } = req.body
        if (!Array.isArray(shop_order_ids)) throw new BadRequestError("userId and array shop_order_ids has must")

        return new SuccessResponse({
            message: "add to cart success",
            metadata: await cartService.addToCart_v2({ userId, shop_order_ids }),
        }).send(res)
    },

    removeItemToCart: async (req, res, next) => {
        console.log(req.body)

        return new SuccessResponse({
            message: "delete to cart success",
            metadata: await cartService.removeItemToCart(req.body),
        }).send(res)
    },
    getListToCart: async (req, res, next) => {
        const { userId } = req.query
        if (!userId) throw new BadRequestError("param userId must require")
        return new SuccessResponse({
            message: "get list to cart success",
            metadata: await cartService.getListUserCart(req.query),
        }).send(res)
    },
}
export default cartController
