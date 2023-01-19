import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  coupon: { type: String, trim: true, required: true, uppercase: true },
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
      },
      name: { type: String, required: false },
    },
  ],
  typeOfProduct: [{ type: String, uppercase: true, required: false }],
  value: { type: Number, required: true, min: 1 },
  discountType: { type: String, required: true, uppercase: true, trim: true },
  createdAt: { type: Date, default: new Date() },
  validUntil: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 1, max: 100 },
  description: { type: String, required: false },
});

export default mongoose.model('Discount', schema);
