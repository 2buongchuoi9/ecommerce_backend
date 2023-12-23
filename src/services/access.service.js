import crypto from "crypto"
import bcrypt from "bcrypt"

import keyTokenService from "./keyToken.service.js"
import { verifyRefreshToken } from "../auth/authUtils.js"
import shopModel from "../models/shop.model.js"
import shopService from "./shop.service.js"
import { RoleShop } from "../helpers/constans.js"
// import  from "./keyToken.service.js"
import { createTokenPair } from "../auth/authUtils.js"
import { AuthFailureError, BadRequestError, ConfictRequestError, FobiddenError, NotFoundError } from "../core/error.response.js"
import keyTokenModel from "../models/keyToken.model.js"

const generateKeyPairSync = () => {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
            // cipher: "aes-256-cbc",
        },
    })
    return { privateKey, publicKey }
}

const accessService = {
    handlerRefreshToken: async ({ keyStore, refreshToken }) => {
        // check nếu RT đã có trong danh sách đã dùng thì cảnh báo về bảo mật và xóa collection
        if (keyStore.refreshTokensUsed.includes(refreshToken)) {
            await keyTokenService.removeKeyById(keyStore._id)
            throw new FobiddenError("Something wrong happend !!! Pls relogin")
        }

        if (keyStore.refreshToken !== refreshToken) throw new AuthFailureError("Shop not register!!!")

        const { userId, email } = await verifyRefreshToken(refreshToken, keyStore.publicKey)

        const foundShop = await shopService.findByEmail({ email })
        if (!foundShop) throw new AuthFailureError("Shop not register!!!")

        // tạo mới key
        const { privateKey, publicKey } = generateKeyPairSync()
        console.log("new keys: ", publicKey, privateKey)

        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)

        await keyTokenModel.updateOne({
            $set: {
                refreshToken: tokens.refreshToken,
                publicKey,
            },
            $addToSet: {
                refreshTokensUsed: refreshToken, // token đã được sử dụng
            },
        })
        return { shop: foundShop, tokens }
    },

    // truyền refresh token vào để ckeck người dùng đăng nhập mới hay đã đăng nhập rồi và đăng nhập thêm lần nữa
    login: async ({ email, password, refreshToken = null }) => {
        // check email and password
        const currentShop = await shopService.findByEmail({ email })
        if (!currentShop) throw new BadRequestError("Shop not registered")

        const match = bcrypt.compare(password, currentShop.password)
        if (!match) throw new AuthFailureError("username or password is not true")

        // create keys
        const { publicKey, privateKey } = generateKeyPairSync()
        const tokens = await createTokenPair({ userId: currentShop._id, email }, publicKey, privateKey)
        await keyTokenService.createToken({ userId: currentShop._id, publicKey, refreshToken: tokens.refreshToken })

        return { shop: currentShop, tokens }
    },

    loginWithOauth2: async ({ email }) => {
        // check email
        const currentShop = await shopService.findByEmail({ email })
        if (!currentShop) throw new BadRequestError("Shop not registered")

        // create keys
        const { publicKey, privateKey } = generateKeyPairSync()
        const tokens = await createTokenPair({ userId: currentShop._id, email }, publicKey, privateKey)
        await keyTokenService.createToken({ userId: currentShop._id, publicKey, refreshToken: tokens.refreshToken })

        return { shop: currentShop, tokens }
    },

    logout: async (keyStore) => {
        console.log("keyStore: ", keyStore)

        const delKey = await keyTokenService.removeKeyById(keyStore._id)
        console.log("keyStore: ", keyStore)
        return delKey
    },

    signUp: async ({ name, email, password }) => {
        // check email
        const holderShop = await shopModel.findOne({ email }).lean()
        if (holderShop) throw new BadRequestError("Shop is registered!!!")

        const newShop = await shopModel.create({ name, email, password, roles: [RoleShop.USER] })
        if (!newShop) throw new ConfictRequestError("Can not create shop")
        return {
            shop: newShop,
            // tokens,
        }
    },

    // chuyen doi role user -> shop
    converRoleShop: async ({ userId }) => {
        const foundShop = await shopModel.findById(userId)
        if (!foundShop) throw new NotFoundError(`not found userId: ${userId}`)

        if (foundShop.roles.includes(RoleShop.SHOP)) throw new BadRequestError("shop is register")

        if (foundShop.roles.includes(RoleShop.MOD)) await foundShop.updateOne({ $pull: { roles: RoleShop.MOD } }, { new: true })

        return await shopModel
            .findOneAndUpdate(
                { _id: userId },
                {
                    $addToSet: { roles: RoleShop.SHOP },
                },
                { new: true, upsert: true }
            )
            .lean()
    },
    createModUser: async ({ ipAddress }) => {
        console.log(ipAddress)
        const email = ipAddress + "@modeUser.gmail.com"

        const foundShop = await shopService.findByEmail({ email })
        if (foundShop) return foundShop
        else
            return await shopModel.create({
                name: ipAddress,
                email,
                password: ipAddress,
                roles: [RoleShop.MOD],
            })
    },
}
export default accessService
