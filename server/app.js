import express from 'express'
import morgan from 'morgan'
import {connectDB} from './db.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser' //permite visualizar cookies como un objeto json

import cors from 'cors'
import taskRoutes from './routes/tasks.routes.js'
import reservaRoutes from './routes/reserve.routes.js'
import dishRoutes from './routes/dish.routes.js'
import orderRoutes from './routes/order.routes.js'

import dotenv from 'dotenv'
dotenv.config()

const app = express()

const port = process.env.PORT || 8000
connectDB()
app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto: ${port}`)
})

app.use(cors({
    origin: process.env.DOMAIN_URL
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api",authRoutes)
app.use("/api",taskRoutes)
app.use('/api', reservaRoutes)
app.use('/api', dishRoutes)
app.use('/api', orderRoutes)
