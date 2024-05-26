import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    type: {
        type: String,
        enum: ['entrante', 'principal', 'postre'],
        required: true
    }
});

export default mongoose.models.Dish || mongoose.model('Dish', dishSchema);
