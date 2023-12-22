import cloudinary from "../config/cloudinary.config.js"
import crypto from "crypto"
import { PutObjectCommand, s3, DeleteObjectCommand } from "../config/s3_AWS.config.js"

const { AWS_BUCKET_NAME } = process.env

const uploadService = {
    //upload file use S3client
    uploadImageFromLocalS3: async ({ file }) => {
        try {
            const randomeImageName = () => crypto.randomBytes(16).toString("hex")

            const command = new PutObjectCommand({
                Bucket: AWS_BUCKET_NAME,
                Key: randomeImageName() + "-" + file.originalname, // file.originalname || "unknow",
                Body: file.buffer,
                ContentType: file.mimetype,
            })

            const command2 = new DeleteObjectCommand({
                Bucket: AWS_BUCKET_NAME,
                Key: "1df4a3efd2794a19e411dd3579740398-icoLG.ico",
            })

            const result = await s3.send(command2)

            // const result = await cloudinary.uploader.upload(path, { public_id: fileName, folder: folder })

            console.log(result)

            return {
                ...result,
                // image_url: result.secure_url,
                // shopId,
                // thumb_url: await cloudinary.url(result.public_id, {
                //     height: 100,
                //     width: 100,
                //     format: "jpg",
                // }),
            }
        } catch (error) {
            console.log("error upload image use S3Client", error)
        }
    },

    uploadImageFromUrl: async () => {
        const folder = "product/123"
        const fileName = "test"
        const imageUrl =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Tr%C3%BAc_Anh_%E2%80%93_M%E1%BA%AFt_bi%E1%BA%BFc_BTS_%282%29.png/375px-Tr%C3%BAc_Anh_%E2%80%93_M%E1%BA%AFt_bi%E1%BA%BFc_BTS_%282%29.png"
        const result = await cloudinary.uploader.upload(imageUrl, { public_id: fileName, folder: folder })

        console.log(result)

        return result
    },

    uploadImageFromLocal: async ({ path, shopId }) => {
        console.log("path", path)

        const fileName = "test"
        const folder = "product/" + shopId
        const result = await cloudinary.uploader.upload(path, { public_id: fileName, folder: folder })

        console.log(result)

        return {
            image_url: result.secure_url,
            shopId,
            thumb_url: await cloudinary.url(result.public_id, {
                height: 100,
                width: 100,
                format: "jpg",
            }),
        }
    },
}

export default uploadService
