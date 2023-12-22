import mongoose, { Schema, Types, model } from "mongoose"
import { CartState } from "../helpers/constans.js"

const DOCUMENT_NAME = "Cart"
const COLLECTION_NAME = "Carts"

const enumCart = Object.keys(CartState).map((v) => CartState[v])

const cartSchema = new mongoose.Schema(
    {
        cart_state: {
            type: String,
            require: true,
            enum: enumCart,
            default: CartState.ACTIVE,
        },
        cart_products: { type: Array, require: true, default: [] },
        cart_userId: { type: Types.ObjectId, require: true, ref: "Shop" },
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let cartModel = model(DOCUMENT_NAME, cartSchema)

export default cartModel
