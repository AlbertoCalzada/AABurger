import mongoose from 'mongoose'

export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Te has conectado con exito a la bbdd')
    } catch (error) {

        console.log(error)
    }
}