import mongoose from 'mongoose'

const reservaSchema = new mongoose.Schema({
    peopleCount: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    selectedTurn: {
      type: String,
      required: true
    }
  });

  export default mongoose.model('Reserve', reservaSchema)