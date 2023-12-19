import mongoose from "mongoose"
import app from "./src/app.js"

const port = process.env.PORT || 8088

const server = app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

process.on("SIGINT", () => {
    server.close(() => {
        console.log("exit server express")
        mongoose.disconnect()
    })
})
