import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  type: { type: String, required: true, uppercase: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true, default: 0 },
  description: { type: String, required: false },
});

export default mongoose.model('Product', schema);
