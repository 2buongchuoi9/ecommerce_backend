import express from "express"
import Database from "./database/init.database.js"
import dotenv from "dotenv"
import morgan from "morgan"
import route from "./routes/index.js"
import { handleError } from "./helpers/handerHelpper.js"
import helmet from "helmet"
import cors from "cors"
import compression from "compression"
import { DataType } from "./helpers/constans.js"
import openApi from "./config/config.swagger.js"

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cors())

Database.getInstance(DataType.MONGO)

// init middelewares
app.use(morgan("dev"))
app.use(helmet()) // chặn bên thứ 3 vào xem thông tin
app.use(compression()) // giảm tài nguyên gửi và nhận

// openApi swagger
openApi(app)

// apply router
app.use(route)
app.use(handleError)

export default app
