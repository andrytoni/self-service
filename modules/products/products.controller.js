import { Router } from 'express';
import Product from '../../models/product.js';

const productsController = Router();

productsController.get('/', async (req, res, next) => {
  try {
    const findProducts = await Product.find();
    return res.json(findProducts);
  } catch (err) {
    next(err);
  }
});

productsController.get('/:name', async (req, res, next) => {
  try {
    const productToFind = req.params.name.toUpperCase();
    const findByName = await Product.find({ name: productToFind });
    return res.json(findByName);
  } catch (err) {
    next(err);
  }
});

productsController.post('/', async (req, res, next) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.json(product);
  } catch (err) {
    next(err);
  }
});

productsController.put('/:name', async (req, res, next) => {
  try {
    const productName = req.params.name.toUpperCase();
    const update = req.body;
    let doc = await Product.findOneAndUpdate({ name: productName }, update);
    return res.json(doc);
  } catch (err) {
    next(err);
  }
});

productsController.delete('/:name', async (req, res, next) => {
  try {
    const productName = req.params.name.toUpperCase();
    let del = await Product.deleteOne({ name: productName });
    return res.json(del);
  } catch (err) {
    next(err);
  }
});

export default productsController;
