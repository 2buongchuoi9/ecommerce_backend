import { SuccessResponse } from "../core/success.response.js"
import categotyService from "../services/category.service.js"

const categoryController = {
    addCategoryByAdmin: async (req, res, next) => {
        console.log("body", req.body)

        return new SuccessResponse({
            message: "add cate success",
            metadata: await categotyService.addCategoryByAdmin(req.body),
        }).send(res)
    },

    getAllCategory: async (req, res, next) => {
        return new SuccessResponse({
            message: "all cate success",
            metadata: await categotyService.getAllCategory(),
        }).send(res)
    },
}
export default categoryController
