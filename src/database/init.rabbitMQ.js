import amqp from "amqplib"

const uri = process.env.URI_RABBITMQ

class RabbiMQ {
    constructor(uri) {
        this.connect(uri)
    }
    async connect(uri) {
        const connect = await amqp.connect(uri)
        this.channel = await connect.createChannel()
    }
    async sendToQueue(queueName, message) {
        await this.channel.assertQueue(queueName, {
            durable: true,
        })
        this.channel.sendToQueue(queueName, Buffer.from(message))
        console.log("message send: ", message)
    }
}

// const rabbiMQ = new RabbiMQ(uri)

// export default rabbiMQ
