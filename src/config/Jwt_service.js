import createHttpError from "http-errors"
import JWT from "jsonwebtoken"
import redisClient from "./connect_redis.js"

const signAccessToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = { userId }
        const secret = process.env.ACCESS_TOKEN_SECRET
        const option = { expiresIn: "20s" }

        JWT.sign(payload, secret, option, (err, token) => {
            if (err) reject(err)
            resolve(token)
        })
    })
}

const verifyAccessToken = (req, res, next) => {
    if (!req.headers["authorization"]) return next(createHttpError.Unauthorized())
    const authorHeader = req.headers["authorization"]
    const bearerToken = authorHeader.split(" ")
    const token = bearerToken[1]
    // verify
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err)
            if (err.name === "JsonWebTokenError") return next(createHttpError.Unauthorized(err.message))
            return next(createHttpError.Unauthorized(err.message))
        }
        req.payload = payload
        next()
    })
}

const signRefreshToken = async (userId) => {
    return new Promise((resolve, reject) => {
        const payload = { userId }
        const secret = process.env.REFRESH_TOKEN_SECRET
        const option = { expiresIn: "1y" }

        JWT.sign(payload, secret, option, async (err, token) => {
            if (err) reject(err)
            if (!(await redisClient.set(userId.toString(), token, { EX: 365 * 24 * 60 * 60 })))
                reject(createHttpError.InternalServerError("không lưu vào redis được"))
            resolve(token)
        })
    })
}

const verifyRefreshToken = async (refreshToken) => {
    return new Promise((resolve, reject) => {
        JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                console.log(err)
                if (err.name === "JsonWebTokenError") return next(createHttpError.Unauthorized(err.message))
                return next(createHttpError.Unauthorized(err.message))
            }
            return resolve(payload)
        })
    })
}

export { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken }
