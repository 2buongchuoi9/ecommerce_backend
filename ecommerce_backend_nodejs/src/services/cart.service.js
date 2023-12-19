import { NotFoundError } from "../core/error.response.js"
import cartModel from "../models/cart.model.js"
import { productModel } from "../models/product.model.js"
import { BadRequestError } from "../core/error.response.js"
import productRepo from "../models/repositories/product.repo.js"

const createUserCart = async ({ userId, product }) => {
    const query = { cart_userId: userId, cart_state: "active" }
    const updateOrInsert = {
        $addToSet: { cart_products: product },
    }
    const options = {
        upsert: true,
        new: true,
    }

    return await cartModel.findOneAndUpdate(query, updateOrInsert, options)
}
const updateUserCart = async ({ userId, product }) => {
    const { productId, quantity } = product

    const query = {
        cart_userId: userId,
        "cart_products.productId": productId,
        cart_state: "active",
    }
    const updateSet = {
        $inc: { "cart_products.$.quantity": quantity },
    }
    const options = {
        upsert: true,
        new: true,
    }

    return await cartModel.findOneAndUpdate(query, updateSet, options)
}

/*
        {
            userId,
            product:{
                productId,
                quantity,
                price
            }
        }
    */
const cartService = {
    addToCart: async ({ userId, product = {} }) => {
        const { productId, quantity } = product

        const _product = await productRepo.checkoutOneProductServer(product)
        if (!_product) throw new BadRequestError(`not found productId: ${productId}`)

        const userCart = await cartModel.findOne({ cart_userId: userId })
        if (!userCart) return await createUserCart({ userId, product: _product })

        console.log(userCart)

        // khong co cart -> tao moi
        if (!userCart.cart_products.length) {
            userCart.cart_products = [_product]
            return await userCart.save()
        }

        // cart co product nay -> update
        return await updateUserCart({ userId, product: _product })
    },

    /*
        {
            userId,
            shop_order_ids:[
                {
                    item_products:[
                        {
                            productId
                            quantity,
                            price,
                            old_quantity,
                        }
                    ],
                    version,
                }
            ]
        }
     */
    addToCart_v2: async ({ userId, shop_order_ids }) => {
        for (const order of shop_order_ids) {
            const checkoutProduct = await productRepo.checkoutProductServer(order.item_products)
            if (checkoutProduct[0]) throw new NotFoundError("not found product id")
            checkoutProduct.forEach(async (p) => {
                const { productId, quantity, old_quantity } = p
                if (quantity === 0) await cartService.removeItemToCart({ userId, productId })
                await updateUserCart({
                    userId,
                    product: {
                        productId,
                        quantity: quantity - old_quantity,
                    },
                })
            })
        }
    },

    removeItemToCart: async ({ userId, productId }) => {
        const foundCart = await cartModel.findOne({ cart_userId: userId }).catch((_) => null)
        if (!foundCart) throw new NotFoundError(`not found cart with user id: ${userId}`)

        if (!foundCart.cart_products.find((v) => v.productId === productId)) throw new NotFoundError(`not found product id: ${userId} in cart`)

        const query = { cart_userId: userId, cart_state: "active" }
        const updateSet = {
            $pull: {
                cart_products: {
                    productId,
                },
            },
        }
        return await cartModel.updateOne(query, updateSet)
    },

    getListUserCart: async ({ userId }) => {
        const carts = await cartModel.findOne({ cart_userId: userId }).lean()
        if (!carts) throw new NotFoundError(`not found list cart for userId ${userId}`)
        return carts
    },
}

export default cartService
