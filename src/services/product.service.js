import { productModel, clothingModel, electronicModel, furnitureModel } from "../models/product.model.js"
import { BadRequestError } from "../core/error.response.js"
// import rabbitMQ from "../database/init.rabbitMQ.js"
import { ProductsName as ProName, ProductStatus } from "../helpers/constans.js"
import productRepo from "../models/repositories/product.repo.js"
import { removeUndefinedObject, updateNestedObjectParser } from "../utils/index.js"
import inventoryRepo from "../models/repositories/inventory.repo.js"

const SELECT = ["_id", "product_name", "product_thumb", "product_price", "product_description"]

const { DRAFT, PUBLISHED } = ProductStatus

const productService = {
    createProduct: async (type, payload) => {
        // rabbitMQ.sendToQueue("test", JSON.stringify(payload))
        return await ProductFactory.createProduct(type, payload)
    },

    // QUERY //
    getAllProducts: async ({ limit = 50, sort, page = 1, filter = { product_status: PUBLISHED } }) => {
        return await productRepo.findAllProducts({ limit, sort, page, filter })
    },
    getOneProduct: async ({ product_id }) => {
        return await productRepo.findProduct({ product_id, unSelect: ["__v"] })
    },
    searchProducts: async ({ keySearch, limit = 50, page = 1 }) => {
        return await productRepo.searchProductByUser({ keySearch, limit, page })
    },

    findAllDraftsForShop: async ({ product_shop, limit = 50, skip = 0 }) => {
        const query = { product_shop, product_status: DRAFT }
        return await productRepo.findAllDraftsForShop({ query, limit, skip })
    },
    findAllPublishForShop: async ({ product_shop, limit = 50, skip = 0 }) => {
        const query = { product_shop, product_status: PUBLISHED }
        return await productRepo.findAllPublishForShop({ query, limit, skip })
    },

    getAllProductByCategoryId: async ({ categoryId }) => {
        return await productModel.find({ product_category: categoryId }).lean()
    },

    // END QUERY //

    // PUT //
    publishProductByShop: async ({ product_shop, product_id }) => {
        return await productRepo.publishProductByShop({ product_shop, product_id })
    },
    // END PUT //

    // PACTH
    updateProduct: async ({ type, productId, payload }) => {
        return await ProductFactory.updateProduct(type, productId, payload)
    },
    // END PACTH
}

class ProductFactory {
    static productRegister = {} //key-class

    static registerProductType(type, classRef) {
        ProductFactory.productRegister[type] = classRef
    }
    static async createProduct(type, payload) {
        const productClass = ProductFactory.productRegister[type]
        if (!productClass) throw new BadRequestError(`create product type ${type}`)
        return new productClass(payload).createProduct()
    }

    static async updateProduct(type, productId, payload) {
        console.log("pay: ", payload)

        const productClass = ProductFactory.productRegister[type]
        if (!productClass) throw new BadRequestError(`update product type ${type}`)
        return new productClass(payload).updateProduct(productId)
    }
}

class Product {
    constructor({
        product_name,
        product_thumb,
        product_price,
        product_quantity,
        product_description,
        product_type,
        product_shop,
        product_attributes,
        product_category,
    }) {
        this.product_name = product_name
        this.product_thumb = product_thumb
        this.product_price = product_price
        this.product_quantity = product_quantity
        this.product_description = product_description
        this.product_type = product_type
        this.product_shop = product_shop
        this.product_attributes = product_attributes
        this.product_category = product_category
    }

    async createProduct(productId) {
        const newProduct = await productModel.create({
            ...this,
            _id: productId,
        })
        if (newProduct) {
            await inventoryRepo.addInventory({
                productId: newProduct._id,
                shopId: this.product_shop,
                stock: this.product_quantity,
            })
        }

        return newProduct
    }
    async updateProduct(productId, payload) {
        return await productRepo.updateProductById({ productId, payload, model: productModel })
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothingModel.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newClothing) throw new BadRequestError("create new clothing error")

        const newProduct = await super.createProduct(newClothing._id)
        if (!newProduct) throw new BadRequestError("create product error")

        return newProduct
    }
    async updateProduct(productId) {
        const objectParams = removeUndefinedObject(this)

        if (objectParams.product_attributes) {
            await productRepo.updateProductById({
                productId,
                payload: updateNestedObjectParser(objectParams.product_attributes),
                model: clothingModel,
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))
        return updateProduct
    }
}

class Electronic extends Product {
    async createProduct() {
        const newElectronic = await electronicModel.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newElectronic) throw new BadRequestError("create new clothing error")

        const newProduct = await super.createProduct(newElectronic._id)
        if (!newProduct) throw new BadRequestError("create product error")

        return newProduct
    }
    async updateProduct(productId) {
        const objectParams = this
        if (objectParams.product_attributes) {
            await productRepo.updateProductById({
                productId,
                payload: updateNestedObjectParser(objectParams.product_attributes),
                model: electronicModel,
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))
        return updateProduct
    }
}

class Furniture extends Product {
    async createProduct() {
        const newFurniture = await furnitureModel.create({
            ...this.product_attributes,
            product_shop: this.product_shop,
        })
        if (!newFurniture) throw new BadRequestError("create new furniture error")

        const newProduct = await super.createProduct(newFurniture._id)
        if (!newProduct) throw new BadRequestError("create product error")

        return newProduct
    }
    async updateProduct(productId) {
        const objectParams = this
        if (objectParams.product_attributes) {
            await productRepo.updateProductById({
                productId,
                payload: updateNestedObjectParser(objectParams.product_attributes),
                model: furnitureModel,
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams))
        return updateProduct
    }
}

// register product type
const productTypeMapperClassRef = [
    { type: ProName.CLOTHING, classRef: Clothing },
    { type: ProName.ELECTRONIC, classRef: Electronic },
    { type: ProName.FURNITURE, classRef: Furniture },
]
productTypeMapperClassRef.forEach((v) => ProductFactory.registerProductType(v.type, v.classRef))

export default productService
