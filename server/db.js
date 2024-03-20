import mongoose from 'mongoose'

export const connectDB = async () => {
    
    try {
        await mongoose.connect('mongodb://localhost:27017/prueba_restaurante')
        console.log('Te has conectado con exito a la bbdd')
    } catch (error) {
        
        console.log(error)
    }
}