import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"

const {
    AWS_BUCKET_NAME: name,
    AWS_BUCKET_ACCESS_KEY: accessKeyId,
    AWS_BUCKET_ACCESS_SECRET: secretAccessKey,
    AWS_BUCKET_ACCESS_REGION: region,
} = process.env

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
})

export { s3, PutObjectCommand, DeleteObjectCommand }
