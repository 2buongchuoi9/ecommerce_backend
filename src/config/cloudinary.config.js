import cloud from "cloudinary"

const cloudinary = cloud.v2

const { CLOUDINATY_NAME, CLOUDINATY_API_KEY, CLOUDINATY_API_SECRET } = process.env

cloudinary.config({
    cloud_name: CLOUDINATY_NAME,
    api_key: CLOUDINATY_API_KEY,
    api_secret: CLOUDINATY_API_SECRET,
})

export default cloudinary
