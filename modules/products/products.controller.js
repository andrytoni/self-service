import { Router } from 'express';
import Product from '../../models/product.js';

const productsController = Router();

productsController.get('/', async (req, res) => {
  const findProducts = await Product.find();
  return res.json(findProducts);
});

productsController.get('/:name', async (req, res) => {
  /* 
  req = {
    params: {
      name: "Batata Frita"
    }
  }
  */
  const productToFind = req.params.name;
  const findByName = await Product.find({ name: productToFind });
  return res.json(findByName);
});

productsController.post('/', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  return res.json(product);
});

productsController.put('/:name', async (req, res) => {
  const productName = req.params.name;
  const update = req.body;
  let doc = await Product.findOneAndUpdate({ name: productName }, update);
  return res.json(doc);
});

productsController.delete('/:name', async (req, res) => {
  const productName = req.params.name;
  let del = await Product.deleteOne({ name: productName });
  return res.json(del);
});

export default productsController;
