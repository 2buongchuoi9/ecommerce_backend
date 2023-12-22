import { SuccessResponse } from "../core/success.response.js"
import discountService from "../services/discount.service.js"

const discountController = {
    createDiscount: async (req, res, next) => {
        console.log(req.body)

        new SuccessResponse({
            message: "create discount success",
            metadata: await discountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId,
            }),
        }).send(res)
    },
    getAllDiscountCodes: async (req, res, next) => {
        new SuccessResponse({
            message: "get all discount code success",
            metadata: await discountService.getAllDiscountCodeForShop({
                ...req.query,
                shopId: req.user.userId,
            }),
        }).send(res)
    },
    getDiscountAmount: async (req, res, next) => {
        console.log(req.body)

        new SuccessResponse({
            message: "get discount amount success",
            metadata: await discountService.getDiscountAmount({
                ...req.body,
            }),
        }).send(res)
    },
    getAllProductWithDiscountCode: async (req, res, next) => {
        new SuccessResponse({
            message: "get discount amount success",
            metadata: await discountService.getAllProductWithDiscountCode({
                ...req.query,
                ...req.body,
                // shopId: req.user.userId,
            }),
        }).send(res)
    },
}
export default discountController
