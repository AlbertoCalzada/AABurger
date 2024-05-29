import mongoose from 'mongoose'

//la forma que van a tener los objetos en la bbdd

const resetTokenSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    token: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  });

export default mongoose.models.ResetToken || mongoose.model('ResetToken', resetTokenSchema);
