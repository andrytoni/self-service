import { Router } from 'express';
import Product from '../../models/product.js';
import ProductsService from './products.service.js';

const productsController = Router();
const productsService = ProductsService(Product);

productsController.get('/', async (req, res, next) => {
  try {
    const products = await productsService.findAll();
    return res.json(products);
  } catch (err) {
    return next(err);
  }
});

productsController.get('/:name', async (req, res, next) => {
  try {
    const product = await productsService.findByName(req.params.name);
    return res.json(product);
  } catch (err) {
    return next(err);
  }
});

productsController.post('/', async (req, res, next) => {
  try {
    const newProduct = await productsService.createNewProduct(req.body);
    return res.json(newProduct);
  } catch (err) {
    return next(err);
  }
});

productsController.put('/:name', async (req, res, next) => {
  try {
    const updatedProduct = await productsService.updateProduct(
      req.params.name,
      req.body
    );

    return res.json(updatedProduct);
  } catch (err) {
    return next(err);
  }
});

productsController.delete('/:name', async (req, res, next) => {
  try {
    const deletedOrder = await productsService.deleteProduct(req.params.name);
    return res.json(deletedOrder);
  } catch (err) {
    return next(err);
  }
});

export default productsController;
