import { Types } from "mongoose"
import { productModel, clothingModel, electronicModel, furnitureModel } from "../product.model.js"

import { getSelectData, unGetSelectData } from "../../utils/index.js"

const productRepo = {
    findAllDraftsForShop: async ({ query, limit, skip }) => {
        return await queryProduct({ query, limit, skip })
    },
    findAllPublishForShop: async ({ query, limit, skip }) => {
        return await queryProduct({ query, limit, skip })
    },

    publishProductByShop: async ({ product_shop, product_id }) => {
        const foundShop = await productModel.findOne({
            product_shop: new Types.ObjectId(product_shop),
            _id: new Types.ObjectId(product_id),
        })
        if (!foundShop) return null

        foundShop.isDraft = false
        foundShop.isPublished = true

        const { modefiedCount } = await foundShop.updateOne(foundShop)
        return modefiedCount
    },

    findAllProducts: async ({ limit, sort, page, filter, select }) => {
        const skip = (page - 1) * limit
        const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 }
        return await productModel.find(filter).sort(sortBy).skip(skip).limit(limit).select(getSelectData(select)).lean()
    },
    searchProductByUser: async ({ keySearch, limit, page, select }) => {
        const skip = (page - 1) * limit
        const regexSearch = new RegExp(keySearch)
        return await productModel
            .find(
                {
                    isDraft: false,
                    $text: { $search: regexSearch },
                },
                { score: { $meta: "textScore" } }
            )
            .sort({ score: { $meta: "textScore" } })
            .skip(skip)
            .limit(limit)
            .select(getSelectData(select))
            .lean()
    },

    findProduct: async ({ product_id, unSelect }) => {
        return await productModel.findById(product_id).select(unGetSelectData(unSelect))
    },

    updateProductById: async ({ productId, payload, model, isNew = true }) => {
        return model.findByIdAndUpdate(productId, payload, { new: isNew })
    },

    findById: async (productId) => {
        return await productModel.findById(productId).lean()
    },

    checkoutOneProductServer: async (product) => {
        const foundProduct = await productRepo.findById(product.productId).catch((_) => null)
        const result = {
            price: foundProduct.product_price,
            quantity: product.quantity,
            productId: foundProduct._id,
        }
        if (product["old_quantity"]) result = { ...result, old_quantity: product.old_quantity }
        return result
    },

    checkoutProductServer: async (products) => {
        return await Promise.all(products.map(async (p) => await checkoutOneProductServer(p)))
    },
}

const queryProduct = async ({ query, limit, skip }) => {
    return await productModel.find(query).populate("product_shop", "name -_id").sort({ updateAt: -1 }).skip(skip).limit(limit).lean().exec()
}

export default productRepo
