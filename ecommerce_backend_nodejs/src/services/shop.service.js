import shopModel from "../models/shop.model.js"

const shopService = {
    findByEmail: async ({ email, select = { email: 1, password: 2, name: 1, status: 1, roles: 1, verify: 1 } }) => {
        console.log("email : ", email)
        return await shopModel.findOne({ email }).select(select).lean()
    },
    findById: async ({ id, select = { _id: 1, email: 1, password: 2, name: 1, status: 1, roles: 1, verify: 1 } }) => {
        console.log("email : ", id)
        return await shopModel.findOne({ _id: id }).select(select).lean()
    },
}

export default shopService
