import { connectToRabbitMQ, consumerQueue } from "../dbs/init.rabbit.js"

const messageService = {
    consumerToQueue: async (queueName) => {
        try {
            const { channel, connect } = await connectToRabbitMQ()
            await consumerQueue(channel, queueName)
        } catch (error) {
            console.log(error)
        }
    },
}

export default messageService
