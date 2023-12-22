import mongoose, { Schema, Types, model } from "mongoose"
import { NotificationType } from "../helpers/constans.js"

const DOCUMENT_NAME = "Notification"
const COLLECTION_NAME = "Notifications"

const enumNotiType = Object.keys(NotificationType).map((v) => NotificationType[v])

const notificationSchema = new mongoose.Schema(
    {
        noti_type: { type: String, enum: enumNotiType, require: true },
        noti_senderId: { type: Types.ObjectId, require: true }, // nguoi gui [shop, admin]
        noti_receivedId: { type: Types.ObjectId, require: true }, // nguoi nhan [user]
        noti_content: { type: String },
        noti_options: { type: Object, default: {} },
    },
    { collection: COLLECTION_NAME, timestaps: true }
)

let notificationModel = model(DOCUMENT_NAME, notificationSchema)

export default notificationModel
