import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, uppercase: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true, default: 0 },
  description: { type: String, required: false }
});

export default mongoose.model('Product', schema);
