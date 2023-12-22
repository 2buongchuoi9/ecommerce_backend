import apikeyModel from "../models/apikey.model.js"

const apikeyService = {
    findById: async (key) => {
        return await apikeyModel.findOne({ key, status: true }).lean()
    },
}

export default apikeyService
