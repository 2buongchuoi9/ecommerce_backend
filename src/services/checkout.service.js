import cartRepo from "../models/repositories/cart.repo.js"
import { BadRequestError } from "../core/error.response.js"
import productRepo from "../models/repositories/product.repo.js"
import discountService from "../services/discount.service.js"
import redisServiec from "./redis.service.js"
import orderModel from "../models/order.model.js"
import cartService from "./cart.service.js"

const checkoutService = {
    /*
      {
        cartId,
        userId,
        shop_order_ids:[
          {
            shopId,
            shop_discounts:[
              {
                shopId,
                discountId,
                codeId
              }
            ],
            item_products:[
              {
                productId,
                price,
                quantity,
              }
            ]
          }
        ]
      }
  */
    checkoutReview: async ({ cartId, userId, shop_order_ids }) => {
        const foundCart = await cartRepo.findByCartId(cartId)
        if (!foundCart) throw new BadRequestError(`not found cart id: ${cartId}`)

        const checkout_order = {
            totalOrder: 0, //tong tien don hang
            ship: 0, //phi van chuyen
            totalDiscount: 0, // tong tien giam gia
            totalCheckout: 0, // tong thanh toan
        }
        const shop_order_ids_new = []

        for (let i = 0; i < shop_order_ids.length; i++) {
            const { shopId, shop_discounts = [], item_products = [] } = shop_order_ids[i]

            const checkoutProduct = await productRepo.checkoutProductServer(item_products)
            if (!checkoutProduct[0]) throw new NotFoundError("not found product id")

            // tong tien 1 don hangcheckoutPrice
            const checkoutPrice = checkoutProduct.reduce((sum, p) => sum + p.quantity * p.price, 0)

            // tong tien don hang chua xu ly
            checkout_order.totalOrder += checkoutPrice

            const itemCheckout = {
                shopId,
                shop_discounts,
                priceRaw: checkoutPrice,
                priceApplyDiscount: checkoutPrice,
                item_products: checkoutService,
            }

            // check discount ma giam gia
            if (shop_discounts.length > 0) {
                const totalDiscount = 0
                for (const discountItem of shop_discounts) {
                    const { discount = 0 } = await discountService.getDiscountAmount({
                        codeId: discountItem.codeId,
                        products: checkoutProduct,
                        shopId,
                        userId,
                    })
                    totalDiscount += discount
                }
                // tong tien giam gia discount cua 1 don hang
                if (totalDiscount > 0) itemCheckout.priceApplyDiscount = checkoutPrice - totalDiscount
            }
            // tong thanh toan cuoi cung
            checkout_order.totalCheckout += itemCheckout.priceApplyDiscount
            shop_order_ids_new.push(itemCheckout)
        }
        return {
            shop_order_ids,
            shop_order_ids_new,
            checkout_order,
        }
    },

    orderByUser: async ({ shop_order_ids, cartId, userId, user_address = {}, user_payment }) => {
        const { shop_order_ids_new, checkout_order } = await checkoutService.checkoutReview({ cartId, shop_order_ids, userId })

        // check lai xem vuot ton kho hay khong
        const products = shop_order_ids_new.flatMap((order) => order.item_products)
        console.log(products)

        const acquireProducts = []
        for (let i = 0; i < products.length; i++) {
            const { productId, quantity } = products[i]
            const keyLock = await redisServiec.acquireLock(productId, quantity, cartId)
            acquireProducts.push(keyLock ? true : false)
            if (keyLock) await redisServiec.releaseLock(keyLock)
        }
        // check neu co 1 san pham het hang trong tro
        if (acquireProducts.includes(false)) throw new BadRequestError("Mot so san pham da duoc cap nhat, vui long quay lai gio hang")
        const newOrder = await orderModel.create({
            order_user: userId,
            order_checkout: checkout_order,
            order_shipping: user_address,
            order_payment: user_payment,
            order_products: shop_order_ids_new,
        })

        // neu insert thanh cong thi remove product co trong gio hang
        if (newOrder) {
            for (let i = 0; i < products.length; i++) {
                const { productId } = products[i]
                await cartService.removeItemToCart({ userId, productId })
            }
        }

        return newOrder
    },

    getOrdersByUser: async ({}) => {
        // bo sung
    },

    getOneOrdersByUser: async ({}) => {
        // bo sung
    },

    // huy don hang
    cancelOrderByUser: async ({}) => {
        // bo sung
    },

    // update order status [shop | admin]
    updateOrderStatusByShop: async ({}) => {
        // bo sung
    },
}

export default checkoutService
