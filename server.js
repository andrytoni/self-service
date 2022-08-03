import 'dotenv/config';
import express from 'express';
import productsController from './modules/products/products.controller.js';
import mongoose from 'mongoose';

 await mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true
});

  const PORT = process.env.PORT || 3000;
  
  const app = express();
  
  app.use(express.json());
  
  app.use('/products', productsController);
  
  app.get('/', (req, res) => {
    return res.send(`Hello World`);
  });
  
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
