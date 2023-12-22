import mongoose from "mongoose"
import dotenv from "dotenv"

import { DataType } from "../helpers/constans.js"

dotenv.config()

class Database {
    constructor(type = DataType.MONGO) {
        this.connect(type)
    }
    connect(type) {
        if (1 === 1) {
            mongoose.set("debug", { color: true })
        }

        switch (type) {
            case DataType.MONGO:
                const uri = process.env.URI_MONGO_ATLAS_TEST
                mongoose
                    .connect(uri)
                    .then((_) => console.log("Connect mongodb success"))
                    .catch((err) => console.log(`Error connect Mongo: ${err}`))
                break

            default:
                throw new Error("error connect db")
        }
    }

    static getInstance(type) {
        if (!Database.instance) {
            Database.instance = new Database(type)
        }
        return Database.instance
    }
}

export default Database
