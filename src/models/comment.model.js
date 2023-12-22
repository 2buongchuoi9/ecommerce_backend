import mongoose, { Types, model } from "mongoose"
import { CartState } from "../helpers/constans.js"

const DOCUMENT_NAME = "Comment"
const COLLECTION_NAME = "Comments"

const enumCart = Object.keys(CartState).map((v) => CartState[v])

const commentSchema = new mongoose.Schema(
    {
        comment_productId: { type: Types.ObjectId, ref: "Product" },
        comment_userId: { type: Types.ObjectId, require: true, ref: "Shop" }, // mod
        comment_content: { type: String },
        comment_left: { type: Number, default: 0 },
        comment_right: { type: Number, default: 0 },
        comment_likes: { type: Array, default: [] },
        comment_parentId: { type: Types.ObjectId, ref: DOCUMENT_NAME },
        isDelete: { type: Boolean, default: false },
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let commentModel = model(DOCUMENT_NAME, commentSchema)

export default commentModel
