import categoryModel from "../category.model.js"

const categoryRepo = {
    getAllcategoryParent: async () => {
        return categoryModel.find({ cate_parentId: null }).lean()
    },

    getAllCategoryHasParentId: async (parentId) => {
        return categoryModel.find({ cate_parentId: parentId }).lean()
    },
}
export default categoryRepo
