import redis from "redis"

const client = redis.createClient({
    port: 6379,
    host: "127.0.0.1",
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
