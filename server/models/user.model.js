import mongoose from 'mongoose'

//la forma que van a tener los objetos en la bbdd

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true  //te limpia los espacios introducidos
    },
    email: {
        type: String,
        required: true,
        unique:true  //no puede haber dos usuarios con el mismo correo
    },
    password: {
        type: String,
        required: true
    }

})

export default mongoose.model('User', userSchema)