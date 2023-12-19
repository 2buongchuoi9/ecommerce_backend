// import { consumerQueue } from "./src/dbs/init.rabbit"
import messageService from "./src/services/consumerQueue.service.js"

const queueName = "test"

messageService
    .consumerToQueue(queueName)
    .then((_) => {
        console.log(queueName)
    })
    .catch((e) => console.log(e))
