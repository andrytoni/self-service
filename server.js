import 'dotenv/config';
import express from 'express';
import productsController from './modules/products/products.controller.js';
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

const PORT = process.env.PORT || 3000;

const app = express();

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  res.send(err.message);
};

app.use(express.json());

app.use('/products', productsController);

app.get('/', (req, res) => {
  return res.send(`Hello World`);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});
