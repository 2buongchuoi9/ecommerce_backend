import { CREATE, OK, SuccessResponse } from "../core/success.response.js"
import { BadRequestError } from "../core/error.response.js"
import checkoutService from "../services/checkout.service.js"

const checkoutController = {
    checkoutReview: async (req, res, next) => {
        const { cartId, shop_order_ids, userId } = req.body

        return new SuccessResponse({
            message: "checkout ok",
            metadata: await checkoutService.checkoutReview({ cartId, shop_order_ids, userId }),
        }).send(res)
    },
}
export default checkoutController
