import productRepo from "../models/repositories/product.repo"
import { BadRequestError } from "../core/error.response.js"
import inventoryModel from "../models/inventory.model"

const inventoryService = {
    addStockToInventory: async ({ stock, productId, shopId, location = "123 Nguyễn Huệ Đắk Đoa Gia Lai" }) => {
        const product = await productRepo.findById(productId)
        if (!product) throw new BadRequestError("product not exist")

        const query = { inven_shopId: shopId, inven_productId: productId }
        const updateSet = {
            $inc: { inven_stock: stock },
            $set: { inven_loaction: location },
        }
        const options = { upsert: true, new: true }

        return await inventoryModel.findOneAndUpdate(query, updateSet, options)
    },
}
export default inventoryService
