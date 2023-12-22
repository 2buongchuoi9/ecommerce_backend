import mongoose, { Schema, model } from "mongoose"

const DOCUMENT_NAME = "Inventory"
const COLLECTION_NAME = "Inventories"

const inventorySchema = new mongoose.Schema(
    {
        inven_productId: { type: Schema.Types.ObjectId, ref: "Product" },
        inven_loaction: { type: String, default: "unKnow" },
        inven_stock: { type: Number, require: true }, // stock: số lượng hàng tồn kho
        inven_shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
        // dat hang thi luu vao day
        iven_reservations: { type: Array, default: [] }, //reservations: danh sách đặt hàng trước
        /*
            cartId,
            stock,
        */
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let inventoryModel = model(DOCUMENT_NAME, inventorySchema)

export default inventoryModel
