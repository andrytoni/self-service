import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: { type: String, required: true, uppercase: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'VIEWER',
    required: true,
    uppercase: true,
    trim: true,
  },
  isActive: { type: Boolean, default: true, required: true },
  createdAt: { type: Date, default: new Date() },
  token: { type: String, required: false },
});

export default mongoose.model('User', schema);

//Dono de restaurante, gerente, garçom, cozinheiro, caixa
