import { SuccessResponse } from "../core/success.response.js"
import { BadRequestError } from "../core/error.response.js"
import uploadService from "../services/upload.service.js"

const uploadController = {
    upLoadfileFromUrl: async (req, res, next) => {
        new SuccessResponse({
            message: "upload oke",
            metadata: await uploadService.uploadImageFromUrl(),
        }).send(res)
    },
    upLoadfile: async (req, res, next) => {
        const { file } = req
        if (!file) throw new BadRequestError("upload success")
        new SuccessResponse({
            message: "upload oke",
            metadata: await uploadService.uploadImageFromLocal({ path: file.path, shopId: req.user.userId }),
        }).send(res)
    },
    // use AWS_s3
    uploadImageFromLocalS3: async (req, res, next) => {
        const { file } = req
        if (!file) throw new BadRequestError("upload success use AWS S3client")
        new SuccessResponse({
            message: "upload oke",
            metadata: await uploadService.uploadImageFromLocalS3({ file }),
        }).send(res)
    },
}

export default uploadController
