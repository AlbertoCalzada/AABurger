import mongoose from 'mongoose'

//la forma que van a tener los objetos en la bbdd

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }   
});

export default mongoose.models.User || mongoose.model('User', userSchema);