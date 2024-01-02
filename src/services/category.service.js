import { BadRequestError, NotFoundError } from "../core/error.response.js"
import categoryModel from "../models/category.model.js"
import { productModel } from "../models/product.model.js"
import categoryRepo from "../models/repositories/category.repo.js"
import productRepo from "../models/repositories/product.repo.js"
import { removeUndefinedObject } from "../utils/index.js"

const categotyService = {
    addCategoryByAdmin: async ({ parentId = null, title, description, thumb }) => {
        console.log("title", title)

        const foundCate = await categoryModel.findOne({ cate_title: title }).lean()
        if (foundCate) throw new BadRequestError("duplicate title category")

        if (parentId) {
            const foundParent = await categoryModel.findById(parentId).lean()
            if (!foundParent) throw new NotFoundError("parent category not found")
        }

        return await categoryModel.create({
            cate_parentId: parentId,
            cate_title: title,
            cate_description: description,
            cate_thumb: thumb,
        })
    },

    updateCategoryByAdmin: async ({ cateId, payload }) => {
        const foundCate = categoryModel.findById(cateId)
        if (!foundCate) throw new NotFoundError("not found cateId")

        const a = removeUndefinedObject(payload)
        console.log("a", a)

        return await categoryModel.findByIdAndUpdate(cateId, a, { new: true })
    },

    getAllCategory: async () => {
        const cateParents = await categoryRepo.getAllcategoryParent()

        console.log("parent", cateParents)

        const result = await Promise.all(
            cateParents.map(async (v) => {
                const a = await categoryRepo.getAllCategoryHasParentId(v._id)
                return { ...v, childer: a }
            })
        )
        return result
    },
}

export default categotyService
