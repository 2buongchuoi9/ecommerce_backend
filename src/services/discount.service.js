import { filter } from "compression"
import { BadRequestError, NotFoundError } from "../core/error.response.js"
import discountModel from "../models/discount.model.js"
import discountRepo from "../models/repositories/discount.repo.js"
import productRepo from "../models/repositories/product.repo.js"

const discountService = {
    createDiscountCode: async ({
        code,
        start_date,
        end_date,
        is_active,
        shopId,
        value,
        user_used,
        min_order_value,
        product_ids,
        applies_to,
        name, //
        description, //
        max_uses,
        uses_count,
        max_uses_per_user,
        type, //
    }) => {
        // check
        if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) throw new BadRequestError("date start and date end is not true")
        if (new Date(start_date) >= new Date(end_date)) throw new BadRequestError("date start and date end is not true")

        const foundDiscount = await discountRepo.checkDiscountExists({ discount_code: code, discount_shopId: shopId })
        if (foundDiscount && foundDiscount.discount_is_active) throw new BadRequestError("discount exists")

        const newDiscount = await discountModel.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_value: value,
            discount_code: code,
            discount_start_date: start_date,
            discount_end_date: end_date,
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_user_used: user_used,
            discount_max_uses_per_user: max_uses_per_user,
            discount_min_order_value: min_order_value || 0,
            discount_shopId: shopId,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: (product_ids = applies_to === "all" ? [] : product_ids),
        })
        return newDiscount
    },

    updateDiscount: async ({}) => {
        // ....
    },

    // get list product by discount code
    getAllProductWithDiscountCode: async ({ codeId, shopId, limit = 50, page = 1 }) => {
        // create index for discount_code
        const foundDiscount = await discountModel
            .findOne({
                discount_code: codeId,
                discount_shopId: shopId,
            })
            .lean()

        if (!foundDiscount || !foundDiscount.discount_is_active) throw new BadRequestError("discount not exists")

        let filter = { isPublished: true }

        filter =
            foundDiscount.discount_applies_to == "all"
                ? { ...filter, product_shop: shopId }
                : { ...filter, _id: { $in: foundDiscount.discount_product_ids } }

        const products = await productRepo.findAllProducts({
            filter,
            limit,
            page,
            sort: "ctime",
            select: ["product_name"],
        })

        return products
    },

    getAllDiscountCodeForShop: async ({ shopId, limit = 50, page = 1 }) => {
        return await discountRepo.findAllDisCountCodeForShop({
            limit,
            page,
            filter: {
                discount_shopId: shopId,
                discount_is_active: true,
            },
            unSelect: ["__v"],
        })
    },

    /**
     * Tinh tong tien khi ap dung ma giam gia cho 1 order
     */
    getDiscountAmount: async ({ codeId, shopId, userId, products }) => {
        const foundDiscount = await discountRepo.checkDiscountExists({ discount_code: codeId, discount_shopId: shopId })
        if (!foundDiscount) throw new NotFoundError("discount do not exists")

        const {
            discount_is_active: isActive,
            discount_max_uses: max,
            discount_start_date: start,
            discount_end_date: end,
            discount_min_order_value: min,
            discount_max_uses_per_user: maxUserUse,
            discount_user_used: users,
            discount_applies_to: applies_to,
            discount_product_ids,
            discount_type,
            discount_value,
        } = foundDiscount

        if (!isActive) throw new NotFoundError("discount expried")
        if (new Date() < new Date(start) || new Date() > new Date(end)) throw new NotFoundError("discount code has expried")

        // check so luong user dc su dung full hay chua
        if (!max) throw new NotFoundError("discount are out")

        const checkoutProducts = await productRepo.checkoutProductServer(products)
        if (!checkoutProducts[0]) throw new BadRequestError("not found product")

        // check san pham co duoc ap dung khuyen mai hay khong
        if (applies_to === "specific") {
            const setProducts = new Set(checkoutProducts.map((v) => v.productId))
            discount_product_ids.forEach((v) => {
                if (!setProducts.has(v._id)) BadRequestError(`Discount does not support applies to product id: ${productId}`)
            })
        }

        // check tong gia tri don hang nho nhat de dc ap dung (don hang phai tren ${min} de dc ap dung)
        const totalOrder = products.reduce((sum, p) => {
            return sum + p.quantity * p.price
        }, 0)
        if (totalOrder < min) throw new NotFoundError(`Order value must be at least ${min} to apply the discount.`)

        // check moi user dc su dung may lan discount nay
        if (maxUserUse > 0) {
            const userUseDiscount = users.find((u) => u.userId === userId)
            if (userUseDiscount && userUseDiscount.lenght > maxUserUse)
                throw new NotFoundError(`discount requires a maximum of ${maxUserUse} uses per user`)
        }

        // check loai discount (so tien co dinh hoac theo phan tram)
        const amount = discount_type == "fixed_amount" ? discount_value : totalOrder * (discount_value / 100)

        return {
            totalOrder,
            discount: amount,
            totalPrice: totalOrder - amount,
        }
    },

    deleteDiscountCode: async ({ shopId, codeId }) => {
        // con su ly nhieu nghiep vu o day nua
        // vi du check co ai dang su dung discount nay khong,...
        return await discountModel.findOneAndUpdate({ discount_code: codeId, discount_shopId: shopId })
    },

    // user cancel discount
    cancelDiscountCode: async ({ codeId, shopId, userId }) => {
        const foundDiscount = await discountRepo.checkDiscountExists({ discount_code: codeId, discount_shopId: shopId })
        if (!foundDiscount) throw new NotFoundError("discount do not exists")
        const result = await discountModel.findOneAndUpdate(foundDiscount._id, {
            $pull: {
                discount_user_used: userId,
            },
            $inc: {
                discount_max_uses: 1, // giam so luong discount dc ap dung di 1
                discount_max_uses_per_user: -1,
            },
        })
        return result
    },
}
export default discountService
