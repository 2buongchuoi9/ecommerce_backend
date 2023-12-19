import inventoryModel from "../inventory.model.js"

const inventoryRepo = {
    addInventory: async ({ productId, shopId, stock, loaction }) => {
        return await inventoryModel.create({
            inven_productId: productId,
            inven_shopId: shopId,
            inven_loaction: loaction,
            inven_stock: stock,
        })
    },

    reservationInventory: async ({ productId, quantity, cartId }) => {
        const query = {
            inven_productId: productId,
            inven_stock: { $gte: quantity },
        }

        const upsert = {
            $incL: { inven_stock: -quantity },
            $push: { inven_reservations: { quantity, cartId, createOn: new Date() } },
        }

        const options = {
            upsert: true,
            new: true,
        }

        return inventoryModel.updateOne(query, upsert, options)
    },
}
export default inventoryRepo
