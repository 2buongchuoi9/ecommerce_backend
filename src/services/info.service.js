import infoModel from "../models/info.model.js"

const infoService = {
    getInfo: async () => {
        const a = await infoModel.find().lean()
        console.log("a", a)

        return a[0]
    },
}

export default infoService
