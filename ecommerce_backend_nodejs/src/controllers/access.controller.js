import accessService from "../services/access.service.js"
import { CREATE, OK, SuccessResponse } from "../core/success.response.js"

const accessController = {
    handlerRefreshToken: async (req, res, netx) => {
        new SuccessResponse({
            message: "Get token success",
            metadata: await accessService.handlerRefreshToken({
                keyStore: req.keyStore,
                refreshToken: req.refreshToken,
            }),
        }).send(res)
    },

    login: async (req, res, next) => {
        new SuccessResponse({
            message: "login success",
            metadata: await accessService.login(req.body),
        }).send(res)
    },

    logout: async (req, res, next) => {
        // console.log("req.keyStore: ", req)

        new SuccessResponse({
            message: "logout success",
            metadata: await accessService.logout(req.keyStore),
        }).send(res)
    },

    signUp: async (req, res, next) => {
        console.log(req.body)
        new CREATE({
            message: "Registered user OK!!!",
            metadata: await accessService.signUp(req.body),
            options: {
                limit: 10,
            },
        }).send(res)
    },

    registerShop: async (req, res, next) => {
        new CREATE({
            message: "Registered shop OK!!!",
            metadata: await accessService.converRoleShop({ userId: req.user.userId }),
            options: {
                limit: 10,
            },
        }).send(res)
    },
    createModUser: async (req, res, next) => {
        new SuccessResponse({
            message: "oke",
            metadata: await accessService.createModUser(req.body),
        }).send(res)
    },

    loginWithOauth2: async (req, res, next) => {
        const { email } = req.user
        return new SuccessResponse({
            message: "",
            metadata: await accessService.loginWithOauth2({ email }),
        }).send(res)
    },
}

export default accessController
