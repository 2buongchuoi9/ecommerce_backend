import mongoose, { Schema, model } from "mongoose"

const DOCUMENT_NAME = "Discount"
const COLLECTION_NAME = "Discounts"

const discountSchema = new mongoose.Schema(
    {
        discount_name: { type: String, require: true },
        discount_description: { type: String, require: true },
        discount_type: { type: String, enum: ["fixed_amount", "percentage_amount"], default: "fixed_amount" },
        discount_value: { type: Number, require: true },
        discount_code: { type: String, require: true },
        discount_start_date: { type: Date, require: true },
        discount_end_date: { type: Date, require: true },
        discount_max_uses: { type: Number, require: true }, // số lương discount được áp dụng
        discount_uses_count: { type: Number, require: true }, // so discount da su dung
        discount_user_used: { type: Array, default: [] }, // ai da su dung
        discount_max_uses_per_user: { type: Number, require: true }, // so luong cho phep toi da duoc su dung cho moi user
        discount_min_order_value: { type: Number, require: true }, // ap dung xho don hang toi tieu bao nhieu tien
        discount_shopId: { type: Schema.Types.ObjectId, ref: "Shop" },
        discount_is_active: { type: Boolean, default: true },
        discount_applies_to: { type: String, require: true, enum: ["all", "specific"] },
        discount_product_ids: { type: Array, default: [] }, // danh sach san pham duoc ap dung
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let discountModel = model(DOCUMENT_NAME, discountSchema)

export default discountModel
