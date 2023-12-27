import infoModel from "../models/info.model.js"

const infoService = {
    getInfo: async () => {
        return await infoModel.find().lean()[0]
    },
}

export default infoService
