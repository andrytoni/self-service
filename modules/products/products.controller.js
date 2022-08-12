import { Router } from 'express';
import Product from '../../models/product.js';
import productService from './product.service.js';

const productsController = Router();
const service = productService(Product);

productsController.get('/', async (req, res, next) => {
  try {
    const findProducts = await service.findAll();
    return res.json(findProducts);
  } catch (err) {
    return next(err);
  }
});

productsController.get('/:name', async (req, res, next) => {
  try {
    const findByName = await service.findByName(req.params.name);
    return res.json(findByName);
  } catch (err) {
    return next(err);
  }
});

productsController.post('/', async (req, res, next) => {
  try {
    const newProduct = await service.createNewProduct(req.body);
    return res.json(newProduct);
  } catch (err) {
    return next(err);
  }
});

productsController.put('/:name', async (req, res, next) => {
  try {
    const update = await service.updateProduct(req.params.name, req.body);

    return res.json(update);
  } catch (err) {
    return next(err);
  }
});

productsController.delete('/:name', async (req, res, next) => {
  try {
    const del = await service.deleteProduct(req.params.name);
    return res.json(del);
  } catch (err) {
    return next(err);
  }
});

export default productsController;
