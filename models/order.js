import mongoose, { isObjectIdOrHexString } from 'mongoose';
import Product from '../../models/product.js';

const Orderschema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, default: 1 },
});

export default mongoose.model('Order', Orderschema);
