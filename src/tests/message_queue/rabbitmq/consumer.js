import amqp from "amqplib"

const runConsumer = async () => {
    try {
        const connect = await amqp.connect("amqp://localhost:5672")
        const channel = await connect.createChannel()

        const queueName = "test"
        await channel.assertQueue(queueName, {
            durable: true,
        })

        channel.consume(
            queueName,
            (mes) => {
                console.log("received: ", mes.content.toString())
            },
            { noAck: true }
        )
    } catch (error) {
        console.log(error)
    }
}

runConsumer().catch(console.log)
