import amqp from "amqplib"

const message = "hello rabbimq"

const queueName = "test"

const runProducer = async () => {
    try {
        const connect = await amqp.connect("amqp://localhost:5672")
        const channel = await connect.createChannel()

        await channel.assertQueue(queueName, {
            durable: true,
        })

        channel.sendToQueue(queueName, Buffer.from(message))
        console.log("message send: ", message)
    } catch (error) {
        console.log(error)
    }
}

runProducer().catch(console.log)
