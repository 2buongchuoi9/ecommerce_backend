import mongoose, { Types, model } from "mongoose"
import { CartState } from "../helpers/constans.js"

const DOCUMENT_NAME = "Info"
const COLLECTION_NAME = "Infos"

const enumCart = Object.keys(CartState).map((v) => CartState[v])

const infoSchema = new mongoose.Schema(
    {
        info_logo: { type: String },
        info_follow: { type: Array },
        info_service_customer: { type: Array },
        info_about: { type: Array },
        info_payment: { type: Array },
        info_ship: { type: Array },
        info_banner: { type: Array },
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let infoModel = model(DOCUMENT_NAME, infoSchema)

export default infoModel
