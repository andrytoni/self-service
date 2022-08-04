import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  description: String
});

//module.exports = mongoose.model('Product', schema);

export default mongoose.model('Product', schema);
