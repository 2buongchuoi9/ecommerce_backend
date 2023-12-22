import { Schema, model } from "mongoose"

const DOCUMENT_NAME = "Key"
const COLLECTION_NAME = "Keys"

var keyTokenSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, require: true, ref: "Shop" },
        publicKey: { type: String, require: true },
        refreshToken: { type: String, require: true },
        refreshTokensUsed: { type: Array, default: [] }, // nhung RT da su dung
    },
    { collection: COLLECTION_NAME, timestamps: true, expires: "7d" }
)
export default model(DOCUMENT_NAME, keyTokenSchema)
