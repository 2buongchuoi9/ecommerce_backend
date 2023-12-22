import multer from "multer"

const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./src/upload")
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname)
        },
    }),
})
const uploadMemory = multer({
    storage: multer.memoryStorage(),
})

export { uploadDisk, uploadMemory }
