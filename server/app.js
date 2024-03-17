import express from 'express'
import morgan from 'morgan'
import {connectDB} from './db.js'
import authRoutes from './routes/auth.routes.js'
/*const {config}= require ('dotenv') //para cargar las variables desde un archivo .env
config()*/

const app = express()

const port = process.env.PORT || 8000
connectDB()
app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto: ${port}`)
})

app.use(morgan('dev'))
app.use(express.json())
app.use("/api",authRoutes)

//probando merge