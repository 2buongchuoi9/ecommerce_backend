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

router.post("/create-info", async (req, res, next) => {
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
                {
                    name: "Facebook",
                    link: "https://www.facebook.com/qd1005/",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703695198/info/2277b37437aa470fd1c71127c6ff8eb5_gczonb.png",
                },
                {
                    name: "Instagram",
                    link: "https://www.instagram.com/dungquoc857/",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703695306/info/5973ebbc642ceee80a504a81203bfb91_uyibcq.png",
                },
                {
                    name: "Github",
                    link: "https://github.com/2buongchuoi9?tab=repositories",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703695632/info/icons8-github-16_pvq672.png",
                },
                {
                    name: "Tiktok",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1703695712/info/icons8-tiktok-16_vgnvpk.png",
                },
            ],
            info_banner: [
                {
                    title: "Khai xuân giáp thìn nghìn deal ngất ngây",
                    link: "",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704114686/info/vn-50009109-6e5c99c54d7dbad6127b5c0cfef50af0_xxhdpi_exssde.jpg",
                },
                {
                    title: "Shoppa siêu rẻ",
                    link: "",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704114674/info/vn-50009109-a7da39a756cfcca90e0c12de46249325_xxhdpi_d48no1.jpg",
                },
                {
                    title: "Khung giờ săn sale",
                    link: "",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704114651/info/vn-50009109-247fb72031b561136cb54238d859a3e3_xxhdpi_wpyymk.jpg",
                },
                {
                    title: "Tết sale mở màng",
                    link: "",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704114639/info/vn-50009109-3e8ca7826928e820624cb0513da975a7_xxhdpi_ndrmwl.jpg",
                },
                {
                    title: "Đặt quyền trở lại",
                    link: "",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704114623/info/vn-50009109-9f55e03457f53c21641e034794aa44a0_xxhdpi_c2ssle.jpg",
                },
                {
                    title: "Khai tiệt năm mới",
                    link: "",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704114607/info/vn-50009109-4b5d609c11c53b399e0cbeb5ccbda015_xxhdpi_tb5wte.jpg",
                },
                {
                    title: "Tet thêm sắt",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138093/info/vn-50009109-2db797991f0971f1822113704889b5a2_xxhdpi_og0yve.jpg",
                },
                {
                    title: "Đón chào năm mới mặc đẹp rạng ngời",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138167/info/vn-50009109-c5903284722496156f685440a195d895_xxhdpi_y5k6sp.jpg",
                },
                {
                    title: "Nhân đôi ưu đãi",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138189/info/vn-50009109-0a5724498d14934fb118fefb9147ce3b_xxhdpi_xm1aab.jpg",
                },
                {
                    title: "Siêu thị điện tử",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138217/info/vn-50009109-361b5965a36a64783edb6456a1782632_xxhdpi_ecsr90.jpg",
                },
                {
                    title: "Mừng năm mới đón lộc siêu hời",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138227/info/vn-50009109-4136a8bc38e1263d1500a959684b408f_xxhdpi_shtp7g.jpg",
                },
                {
                    title: "sắm tết giảm hết 50%",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138235/info/vn-50009109-9bdcd84f2ddc064ce1f8bc857569467b_xxhdpi_luzxgz.jpg",
                },
                {
                    title: "Tết bung xõa sale to, quá đã",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138244/info/vn-50009109-32ac7992fe7d6be3688be259a508baf3_xxhdpi_x75rat.jpg",
                },
                {
                    title: "Siêu deal quốc tế",
                    link: "https://www.tiktok.com/@phuongmoc2801",
                    thumb: "https://res.cloudinary.com/anhdaden/image/upload/v1704138252/info/vn-50009109-ff769d509ee433b6dd57dcf57cb0201d_xxhdpi_el35xu.jpg",
                },
            ],
        }),
    }).send(res)
})

export default router
