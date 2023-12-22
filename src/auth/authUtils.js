import crypto from "crypto"
import JWT from "jsonwebtoken"
import { asyncHandler } from "../helpers/handerHelpper.js"
import { Headers } from "../helpers/constans.js"
import { AuthFailureError, BadRequestError, NotFoundError } from "../core/error.response.js"
import keyTokenService from "../services/keyToken.service.js"

// phuong an ma hoa key
const options = { algorithms: ["RS256"] }

const createTokenPair = async (payload, publicKey, privateKey) => {
    try {
        const accessToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "2 days",
        })
        const refreshToken = await JWT.sign(payload, privateKey, {
            algorithm: "RS256",
            expiresIn: "7 days",
        })

        await JWT.verify(accessToken, publicKey, (err, decode) => {
            if (err) console.log("err 1: ", err)
            else console.log("decode in create: ", decode)
        })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log("err 2: ", error)
        // throw error
    }
}

const checkRefreshToken = asyncHandler(async (req, res, next) => {
    // check userId
    const userId = req.headers[Headers.CLIENI_ID]
    if (!userId) throw new AuthFailureError(`Invadid Request '${Headers.CLIENI_ID} must in header'`)

    // getAccessToken
    const keyStore = await keyTokenService.findByUserId(userId)
    console.log("keystore: ", keyStore)

    if (!keyStore) throw new NotFoundError("Not found access token")

    // verify refresh token
    // nếu truyền refreshtoken vào hearder thì hiểu đó là handlerRefreshToken và không cần verify access token
    const refreshToken = req.headers[Headers.REFRESHTOKEN]
    if (!refreshToken) throw new BadRequestError(`header must has ${Headers.REFRESHTOKEN} if you want action refresh token`)

    req.keyStore = keyStore
    req.refreshToken = refreshToken
    return next()
})

const verifyJWT = async (token, keySecret, isAccessToken = true) => {
    const mes = isAccessToken ? " accescc token" : " refresh token"
    try {
        return await JWT.verify(token, keySecret, options)
    } catch (error) {
        console.log("err verifyJWT:", error)
        throw new AuthFailureError(error.message + mes)
    }
}

const verifyAccessToken = async (accessToken, keySecret) => {
    return await verifyJWT(accessToken, keySecret)
}

const verifyRefreshToken = async (refreshToken, keySecret) => {
    return await verifyJWT(refreshToken, keySecret, false)
}

export { createTokenPair, verifyRefreshToken, verifyAccessToken, checkRefreshToken }
