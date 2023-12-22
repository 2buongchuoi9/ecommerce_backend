import { Schema, Types } from "mongoose"
import keyTokenModel from "../models/keyToken.model.js"

const keyTokenService = {
    createToken: async ({ userId, publicKey, refreshToken }) => {
        try {
            const filter = { user: userId }
            const update = { publicKey, refreshToken, refreshTokensUsed: [] }
            const options = { upsert: true, new: true }

            const token = await keyTokenModel.findOneAndUpdate(filter, update, options).lean()
            return token ? token.publicKey : null
        } catch (error) {
            return error
        }
    },

    findByUserId: async (userId) => {
        return await keyTokenModel.findOne({ user: userId }).lean()
    },

    removeKeyById: async (id) => {
        return await keyTokenModel.deleteOne({ _id: id })
    },

    findByRefreshTokensUsed: async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshTokensUsed: refreshToken }).lean()
    },

    findByRefreshToken: async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken })
    },
}
export default keyTokenService
