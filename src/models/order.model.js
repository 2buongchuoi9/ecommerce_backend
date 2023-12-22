import mongoose, { Schema, Types, model } from "mongoose"
import { OrderState } from "../helpers/constans.js"

const DOCUMENT_NAME = "Order"
const COLLECTION_NAME = "Orders"

const enumStatus = Object.keys(OrderState).map((k) => OrderState[k])

const orderSchema = new mongoose.Schema(
    {
        order_user: { type: Types.ObjectId, require: true, ref: "Shop" },
        order_checkout: { type: Object, default: {} },
        /*
          totalPrice,
          totalApplyDiscount,
          ship
        */
        order_shipping: { type: Object, default: {} },
        /*
            street,
            city,
            state,
            country
        */
        order_payment: { type: Object, default: {} },
        order_products: { type: Array, require: true },
        order_trackingNumber: { type: String, default: "#0000124122023" }, // 0001 ngay 14 thang 12 2023
        order_status: { type: String, enum: enumStatus, default: OrderState.PENDING },
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let orderModel = model(DOCUMENT_NAME, orderSchema)

export default orderModel
