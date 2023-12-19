import mongoose, { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import { RoleShop, AuthType } from "../helpers/constans.js"

const DOCUMENT_NAME = "Shop"
const COLLECTION_NAME = "Shops"

const enumAuthType = Object.keys(AuthType).map((k) => AuthType[k])

const shopSchema = new mongoose.Schema(
    {
        name: { type: String },
        email: { type: String, unique: true, require: true },
        password: { type: String },
        status: { type: String, enum: ["active", "unactive"], default: "unactive" },
        verify: { type: Schema.Types.Boolean, default: false },
        roles: { type: Array, default: [RoleShop.USER] },
        authType: { type: String, enum: enumAuthType, default: AuthType.LOCAL },
        googleId: { type: String, default: null },
        facebookId: { type: String, default: null },
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

shopSchema.pre("save", async function (next) {
    try {
        if (this.authType !== AuthType.LOCAL) {
            this.verify = true
        } else {
            this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10))
        }
        next()
    } catch (error) {
        next(error)
    }
})

let shopModel = model(DOCUMENT_NAME, shopSchema)

export default shopModel
