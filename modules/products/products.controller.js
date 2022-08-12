import { Router } from 'express';
import Product from '../../models/product.js';
import productsService from './products.service.js';

const productsController = Router();
const productService = productsService(Product);

productsController.get('/', async (req, res, next) => {
  try {
    const findProducts = await productService.findAll();
    return res.json(findProducts);
  } catch (err) {
    return next(err);
  }
});

productsController.get('/:name', async (req, res, next) => {
  try {
    const findByName = await productService.findByName(req.params.name);
    return res.json(findByName);
  } catch (err) {
    return next(err);
  }
});

productsController.post('/', async (req, res, next) => {
  try {
    const newProduct = await productService.createNewProduct(req.body);
    return res.json(newProduct);
  } catch (err) {
    return next(err);
  }
});

productsController.put('/:name', async (req, res, next) => {
  try {
    const update = await productService.updateProduct(
      req.params.name,
      req.body
    );

    return res.json(update);
  } catch (err) {
    return next(err);
  }
});

productsController.delete('/:name', async (req, res, next) => {
  try {
    const del = await productService.deleteProduct(req.params.name);
    return res.json(del);
  } catch (err) {
    return next(err);
  }
});

export default productsController;
