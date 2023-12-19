import apikeyService from "../services/apikeyService.js"
import keyTokenService from "../services/keyToken.service.js"
import { Headers, RoleShop } from "../helpers/constans.js"
import { asyncHandler } from "../helpers/handerHelpper.js"
import { AuthFailureError, BadRequestError, NotFoundError } from "../core/error.response.js"
import { verifyAccessToken } from "./authUtils.js"
import shopModel from "../models/shop.model.js"

const apikey = asyncHandler(async (req, res, next) => {
    // check apikey x-api-key
    const key = req.headers[Headers.API_KEY?.toString()]
    if (!key) throw new BadRequestError(`headers must has ${Headers.API_KEY}`)
    // check objKey
    const objKey = await apikeyService.findById(key)
    if (!objKey) throw new AuthFailureError(`invalid header ${Headers.API_KEY}`)

    req.objKey = objKey
    return next()
})

const permission = (permission) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.objKey.permissions) return new AuthFailureError(`missng ${Headers.API_KEY} -> permission`)

        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) throw new AuthFailureError(`missng ${Headers.API_KEY} -> permission`)

        return next()
    })
}

const authentication = asyncHandler(async (req, res, next) => {
    // check userId
    const userId = req.headers[Headers.CLIENI_ID]
    if (!userId) throw new AuthFailureError(`Invadid Request '${Headers.CLIENI_ID} must in header'`)

    // getKeyStore
    const keyStore = await keyTokenService.findByUserId(userId).catch(() => {
        throw new NotFoundError("Not found x-client-id")
    })
    if (!keyStore) throw new NotFoundError("Not found x-client-id")

    // verify access token
    const accessToken = req.headers[Headers.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError(`Invadid Request '${Headers.AUTHORIZATION} must in header'`)

    // check key with this userId
    const decodeUser = await verifyAccessToken(accessToken, keyStore.publicKey)
    if (decodeUser.userId !== userId) throw new AuthFailureError("Invalid UserId in access token")

    req.keyStore = keyStore
    req.user = decodeUser // {userId, email}
    return next()
})

const permissionRole = (role) => {
    return asyncHandler(async (req, res, next) => {
        const { userId } = req.user
        const foundShop = await shopModel.findById(userId)
        if (!foundShop || !foundShop.roles.includes(role)) throw new AuthFailureError(`not permission role`)

        return next()
    })
}

export { apikey, permission, authentication, permissionRole }
