import amqp from "amqplib"

const connectToRabbitMQ = async () => {
    const connect = await amqp.connect("amqp://localhost:5672")
    if (!connect) throw new Error("failed to connect rabbiMQ")

    const channel = await connect.createChannel()

    return { channel, connect }
}

const connectToRabbitMQForTest = async () => {
    try {
        const { channel, connect } = await connectToRabbitMQ()

        // pushlish
        const queue = "test-queue"
        const message = "hello, ecommerce by anhdaden"
        await channel.assertQueue(queue)

        channel.sendToQueue(queue, Buffer.from(message))
        await connect.close()
    } catch (error) {
        console.log(error)
    }
}

const consumerQueue = async (channel, queueName) => {
    try {
        await channel.assertQueue(queueName)

        channel.prefetch(1)

        channel.consume(
            queueName,
            (msg) => {
                console.log(`deceived message ${queueName} :: `, msg.content.toString())
            },
            { noAck: true } // xac nhan da nhan dc message
        )
    } catch (error) {
        console.log(error)
    }
}

export { connectToRabbitMQ, consumerQueue }
