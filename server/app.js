import express from 'express'
/*const {config}= require ('dotenv') //para cargar las variables desde un archivo .env
config()*/

const app = express()

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Servidor escuchando en el puerto: ${port}`)
})


