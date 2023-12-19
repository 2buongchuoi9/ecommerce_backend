import { unGetSelectData, getSelectData } from "../..//utils/index.js"
import discountModel from "../discount.model.js"

const discountRepo = {
    findAllDisCountCodeForShop: async ({ limit, page, sort, filter, unSelect = [], select = [] }) => {
        const skip = (page - 1) * limit
        const _select = {}
        const sortBy = sort === "ctime" ? { _id: -1 } : { _id: 1 }
        if (!select) _select = { _select, ...getSelectData(select) }
        if (!unSelect) _select = { ..._select, ...unGetSelectData(unGetSelectData) }
        return await discountModel.find(filter).sort(sortBy).skip(skip).limit(limit).select(_select).lean()
    },

    checkDiscountExists: async (filter) => {
        return discountModel.findOne({ ...filter }).lean()
    },
}
export default discountRepo
