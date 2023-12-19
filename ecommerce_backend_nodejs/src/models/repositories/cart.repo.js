import { CartState } from "../../helpers/constans.js"
import cartModel from "../cart.model.js"

const cartRepo = {
    findByCartId: async (cartId) => {
        return await cartModel.findOne({ _id: cartId, cart_state: CartState.ACTIVE }).lean()
    },
}
export default cartRepo
