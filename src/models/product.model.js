import mongoose, { Schema, model, mongo } from "mongoose"
import { ProductsName as ProName } from "../helpers/constans.js"
import slug from "mongoose-slug-updater"

const DOCUMENT_NAME = "Product"
const COLLECTION_NAME = "Products"
const shop = "Shop"
const enumProductType = Object.keys(ProName).map((v) => ProName[v])

mongoose.plugin(slug)

const productSchema = new Schema(
    {
        product_name: { type: String, require: true },
        product_slug: { type: String, slug: "product_name", unique: true },
        product_thumb: { type: String },
        product_price: { type: Number, require: true },
        product_quantity: { type: Number, require: true },
        product_description: { type: String },
        product_type: { type: String, require: true, enum: enumProductType },
        product_shop: { type: Schema.Types.ObjectId, ref: shop },
        product_attributes: { type: Schema.Types.Mixed, require: true },
        // more
        product_ratingAVG: {
            type: Number,
            default: 4.5,
            min: [1, "Rating must be above 1.0"],
            max: [5, "Rating must be above 5.0"],
            set: (val) => Math.round(val * 10) / 10,
        },
        product_variations: { type: Array, default: [] },
        isDraft: { type: Boolean, default: true, index: true },
        isPublished: { type: Boolean, default: false, index: true },
    },
    { collection: COLLECTION_NAME, timestamps: true }
)

const clothingSchema = new Schema(
    {
        product_shop: { type: Schema.Types.ObjectId, ref: shop },
        brand: { type: String },
        size: { type: String },
        material: { type: String }, // material: vật liệu
    },
    { collection: ProName.CLOTHING + "s", timestamps: true }
)

const electronicSchema = new Schema(
    {
        product_shop: { type: Schema.Types.ObjectId, ref: shop },
        manufacturer: { type: String, require: true }, // manufacturer: nhà sản xuất
        model: { type: String },
        color: { type: String },
    },
    { collection: ProName.ELECTRONIC + "s", timestamps: true }
)
const furnitureSchema = new Schema( // furniture: nột thất
    {
        product_shop: { type: Schema.Types.ObjectId, ref: shop },
        brand: { type: String, require: true },
        material: { type: String },
        size: { type: String },
    },
    { collection: ProName.FURNITURE + "s", timestamps: true }
)

// index
productSchema.index({ product_name: "text", product_description: "text" })

const productModel = model(DOCUMENT_NAME, productSchema)
const clothingModel = model(ProName.CLOTHING, clothingSchema)
const electronicModel = model(ProName.ELECTRONIC, electronicSchema)
const furnitureModel = model(ProName.FURNITURE, furnitureSchema)

export { productModel, clothingModel, electronicModel, furnitureModel }
