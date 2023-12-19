import { model, Schema } from "mongoose"

const DOCUMENT_NAME = "Apikey"
const COLLECTION_NAME = "Apikeys"

const apikeySchema = new Schema(
    {
        key: { type: String, require: true, unique: true },
        status: { type: Boolean, default: true },
        permissions: { type: [String], require: true, enum: ["0000", "1111", "2222"] },
    },
    { collection: COLLECTION_NAME, timestamps: true }
)

export default model(DOCUMENT_NAME, apikeySchema)
