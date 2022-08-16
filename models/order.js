import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  products: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      name: { type: String },
      price: { type: Number },
      obs: { type: String, required: false },
    },
  ],
  owner: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    table: {
      type: Number,
      required: false,
    },
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: Number,
    //0 Pedido enviado
    //1 Pedido aprovado
    //2 Pedido em preparo
    //3 Pedido pronto
    //4 Pedido entregue
    //5 Pedido finalizado
    default: 0,
  },
  totalValue: {
    type: Number,
    required: true,
  },
  canceled: {
    type: Boolean,
    required: false,
  },
});

export default mongoose.model('Order', schema);
