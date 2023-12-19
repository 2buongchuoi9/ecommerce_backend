import { promisify } from "util"
import redisClient from "../database/init.redis.js"
import iventoryRepo from "../models/repositories/inventory.repo.js"

const pexpire = promisify(redisClient.pExpire).bind(redisClient)
const setnxAsync = promisify(redisClient.setNX).bind(redisClient)
const redisServiec = {
    acquireLock: async (productId, quantity, cartId) => {
        const key = `lock_v2023_${productId}`
        const retryTimes = 10
        const expireTime = 3000

        for (let i = 0; i < retryTimes; i++) {
            // tao key, ai nam key dc vao thanh toan
            const result = await setnxAsync(key, expireTime)
            console.log(result)

            if (result === 1) {
                //  thao tac voi iventory

                const isReversation = await iventoryRepo.reservationInventory({ productId, quantity, cartId })
                if (isReversation.modifiedCount) {
                    await pexpire(key, expireTime)
                    return key
                }
                return null
            } else {
                await new Promise((resolve) => setTimeout(resolve, 50))
            }
        }
    },

    releaseLock: async (keyLock) => {
        const delAsyncKey = promisify(redisClient.del).bind(redisClient)
        return await delAsyncKey(keyLock)
    },
}
export default redisServiec
