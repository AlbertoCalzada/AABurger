import mongoose from 'mongoose'

//la forma que van a tener los objetos en la bbdd

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true
})

export default mongoose.model('Task', taskSchema)