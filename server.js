import 'dotenv/config';
import express from 'express';
import productsController from './modules/products/products.controller.js';
import ordersController from './modules/orders/orders.controller.js';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
});

const PORT = process.env.PORT || 3000;

const app = express();

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ error: err.message });
};

app.use(express.json());
app.use('/products', productsController);
app.use('/orders', ordersController);
app.get('/', (req, res) => {
  return res.send(`Hello World`);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
