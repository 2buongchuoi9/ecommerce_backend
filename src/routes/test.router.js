import express from "express"

import { SuccessResponse } from "../core/success.response.js"
import infoModel from "../models/info.model.js"
const router = express.Router()

router.get("/cc", (req, res, next) => {
    apikeyModel.create({
        key: "d9c34385-64f0-4619-b6ef-53c7ddc46be4",
        permissions: ["0000"],
        status: true,
    })
})

router.get("/checkstatus", (req, res, next) => {
    return new SuccessResponse({
        message: "oke",
    }).send(res)
})

router.get("/create-info", async (req, res, next) => {
    return new SuccessResponse({
        message: "oke",
        metadata: await infoModel.create({
            info_logo: "https://res.cloudinary.com/anhdaden/image/upload/v1703660677/info/dadenshoptrang30_zjyqdk.png",
            info_about: [
                { name: "Giới Thiệu Về Shopee Việt Nam", link: "" },
                { name: "Tuyển Dụng", link: "" },
                { name: "Điều Khoản Shopee", link: "" },
                { name: "Chính Sách Bảo Mật", link: "" },
                { name: "Chính Hãng", link: "" },
                { name: "Kênh Người Bán", link: "" },
                { name: "Flash Sales", link: "" },
                { name: "Chương Trình Tiếp Thị Liên Kết Shopee", link: "" },
                { name: "Liên Hệ Với Truyền Thông", link: "" },
            ],
            info_service_customer: [
                { name: "Giới Thiệu Về Shopee Việt Nam", link: "" },
                { name: "Trung Tâm Trợ Giúp", link: "" },
                { name: "Shopee Blog", link: "" },
                { name: "Shopee Mall", link: "" },
                { name: "Hướng Dẫn Mua Hàng", link: "" },
                { name: "Hướng Dẫn Bán Hàng", link: "" },
                { name: "Thanh Toán", link: "" },
                { name: "Shopee Xu", link: "" },
                { name: "Vận Chuyển", link: "" },
                { name: "Trả Hàng & Hoàn Tiền", link: "" },
                { name: "Chăm Sóc Khách Hàng", link: "" },
                { name: "Chính Sách Bảo Hành", link: "" },
            ],
            info_ship: [
                {
                    name: "spx",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703683767/info/vn-50009109-159200e3e365de418aae52b840f24185_hnlvuv.png",
                },
                {
                    name: "ghtk",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684002/info/d10b0ec09f0322f9201a4f3daf378ed2_flvrxo.png",
                },
                {
                    name: "ghn",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684097/info/77bf96a871418fbc21cc63dd39fb5f15_nkypkz.jpg",
                },
                {
                    name: "vittel",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684424/info/59270fb2f3fbb7cbc92fca3877edde3f_d0kw0q.png",
                },
                {
                    name: "vnpost",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684467/info/957f4eec32b963115f952835c779cd2c_a6kcbl.png",
                },
                {
                    name: "be",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684508/info/0b3014da32de48c03340a4e4154328f6_u3u82u.png",
                },
            ],
            info_payment: [
                {
                    name: "visa",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684572/info/d4bbea4570b93bfd5fc652ca82a262a8_hodz7e.png",
                },
                {
                    name: "oo",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684617/info/a0a9062ebe19b45c1ae0506f16af5c16_cc6ola.png",
                },
                {
                    name: "jbc",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684695/info/38fd98e55806c3b2e4535c4e4a6c4c08_hbdilp.png",
                },
                {
                    name: "gop",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703684735/info/5e3f0bee86058637ff23cfdf2e14ca09_r6mkc8.png",
                },
            ],
            info_follow: [
                { name: "Facebook", link: "https://www.facebook.com/qd1005/" },
                { name: "Instagram", link: "https://www.instagram.com/dungquoc857/" },
                { name: "Github", link: "https://github.com/2buongchuoi9?tab=repositories" },
                { name: "Tiktok", link: "https://www.tiktok.com/@phuongmoc2801" },
            ],
        }),
    }).send(res)
})

export default router
