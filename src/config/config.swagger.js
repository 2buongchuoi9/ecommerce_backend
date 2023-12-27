import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const specs = swaggerJSDoc({
    definition: {
        openapi: "3.0.0",
        info: {
            title: "shopaa ecommerce API",
            version: "1.0.0",
            description: "use by anhdaden",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: "wellcome shopaa server",
            },
            {
                url: `http://shopaa.click`,
                description: "wellcome shopaa server",
            },
        ],
        components: {
            schemas: {
                RequestCreateCart: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the shop",
                        },
                    },
                    example: {
                        name: "anh da den",
                    },
                },
                RequestUpdateCart: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the shop",
                        },
                    },
                    example: {
                        name: "anh da den",
                    },
                },
                RequestDeleteCart: {
                    type: "object",
                    required: ["name"],
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the shop",
                        },
                    },
                    example: {
                        name: "anh da den",
                    },
                },
                RequestRegister: {
                    type: "object",
                    required: ["name", "email", "password", "msisdn"],
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the shop",
                        },
                        email: {
                            type: "string",
                            description: "The email of the shop",
                        },
                        password: {
                            type: "string",
                            description: "The password of the shop",
                        },
                        msisdn: {
                            type: "string",
                            description: "The msisdn of the shop",
                        },
                    },
                    example: {
                        name: "anh da den",
                        email: "anhdaden@gmail.com",
                        password: "123123a@",
                        msisdn: "0936631402",
                    },
                },
                RequestLogin: {
                    type: "object",
                    required: ["email", "password"],
                    properties: {
                        email: {
                            type: "string",
                            description: "The email of the shop",
                        },
                        password: {
                            type: "string",
                            description: "The password of the shop",
                        },
                    },
                    example: {
                        email: "anhdaden@gmail.com",
                        password: "123123a@",
                    },
                },
                Product: {
                    type: "object",
                    required: ["product_name", "product_thumb", "product_price", "product_quality", "product_type", "product_attributes"],
                    properties: {
                        product_name: {
                            type: "string",
                            description: "The name of the product",
                        },
                        product_thumb: {
                            type: "string",
                            description: "The thumb of the product",
                        },
                        product_price: {
                            type: "integer",
                            description: "The price of the product",
                        },
                        product_quality: {
                            type: "integer",
                            description: "The quality of the product",
                        },
                        product_type: {
                            type: "string",
                            description: "The type of the product",
                        },
                        product_attributes: {
                            type: "Array",
                            description: "The attributes of the product",
                        },
                    },
                    example: {
                        product_name: "Quấn áo Nam siêu mát giày",
                        product_description: "Quần áo Nam gray",
                        product_price: 12345.0,
                        product_type: "Clothing",
                        product_thumb: "https://tiger01042023.s5.ap-southeast-1.amazonaws.com/PNG+image.png",
                        product_quality: 23,
                        product_attributes: {
                            brand: "TTF",
                            size: "XL",
                            material: "Thun",
                        },
                    },
                },
                Shop: {
                    type: "object",
                    required: ["name", "email", "password", "msisdn"],
                    properties: {
                        name: {
                            type: "string",
                            description: "The name of the shop",
                        },
                        email: {
                            type: "string",
                            description: "The email of the shop",
                        },
                        password: {
                            type: "string",
                            description: "The password of the shop",
                        },
                    },
                    example: {},
                },
                Discount: {
                    type: "object",
                    required: ["discount_code", "discount_amount"],
                    properties: {
                        discount_code: {
                            type: "string",
                            description: "The name of the shop",
                        },
                        discount_amount: {
                            type: "string",
                            description: "The email of the shop",
                        },
                    },
                    example: {},
                },
            },
            securitySchemes: {
                authorization: {
                    type: "apiKey",
                    in: "header",
                    bearerFormat: "JWT",
                    name: "authorization",
                },
                apiKey: {
                    type: "apiKey",
                    in: "header",
                    name: "x-api-key",
                },
                clientId: {
                    type: "apiKey",
                    in: "header",
                    name: "x-client-id",
                },
            },
            security: [{ authorization: [], apiKey: [], clientId: [] }],
        },
    },
    apis: ["./src/routes/*.js"],
})

const openApi = (app) => {
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs))
}

export default openApi
