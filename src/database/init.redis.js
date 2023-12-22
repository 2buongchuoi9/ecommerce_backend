import redis from "redis"

const { REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env

const client = redis.createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
})

client.on("error", function (err) {
    console.error(err)
})

client.on("connect", function (err) {
    console.log("connected redis is success")
})

client.on("ready", function (err) {
    console.log("redis is ready")
})

var redisClient = await client.connect()

export default redisClient
