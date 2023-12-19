const Headers = {
    API_KEY: "x-api-key",
    CLIENI_ID: "x-client-id",
    AUTHORIZATION: "authorization",
    REFRESHTOKEN: "x-rtoken-id",
}

const RoleShop = {
    MOD: "mod",
    USER: "user",
    SHOP: "shop",
    ADMIN: "admin",
}
const ProductsName = {
    CLOTHING: "Clothing",
    ELECTRONIC: "Electronic",
    FURNITURE: "Furniture",
}

const CartState = {
    ACTIVE: "active",
    COMPLETED: "completed",
    FAILED: "failed",
    PENDING: "pending",
}
const OrderState = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    SHIPPED: "shipped",
    CANCELLED: "cancelled",
    DELIVERED: "delivered",
}

const DataType = {
    MONGO: "mongodb",
    MYSQL: "mysql",
    SQLSERVER: "sqlserver",
}

const NotificationType = {
    ORDER_OK: "order-ok",
    ORDER_FAIELD: "order-faield",
    PRODUCT_NEW: "product-new",
    SHOP_NEW_Product: "shop-new-product",
    ADMIN: "admin",
}

const AuthType = {
    LOCAL: "local",
    GOOGLE: "google",
    FACEBOOK: "facebook",
}

export { Headers, RoleShop, ProductsName, CartState, OrderState, DataType, NotificationType, AuthType }
