import mongoose from "mongoose"

const connect = async (uri) => {
    const conn = mongoose.connect(uri)
    try {
        await mongoose.connect(uri)
        console.log(`connect database success!!!`)
        return mongoose
    } catch (error) {
        console.log("connect database fail", error)
    }
}

export default { connect }
