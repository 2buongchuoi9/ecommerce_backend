import mongoose, { Types, model } from "mongoose"
import { CartState } from "../helpers/constans.js"

const DOCUMENT_NAME = "Category"
const COLLECTION_NAME = "Categories"

const enumCart = Object.keys(CartState).map((v) => CartState[v])

const categorySchema = new mongoose.Schema(
    {
        cate_parentId: { type: Types.ObjectId, ref: DOCUMENT_NAME, default: null },
        cate_title: { type: String, required: true },
        cate_description: { type: String },
        cate_thumb: { type: String },
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let categoryModel = model(DOCUMENT_NAME, categorySchema)

export default categoryModel
