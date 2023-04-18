import { Router } from 'express';
import Product from '../../models/product.js';
import ProductsService from './products.service.js';

const productsController = Router();
const productsService = ProductsService(Product);

productsController.get('/', async (req, res, next) => {
  try {
    const products = await productsService.find(req.query);

    return res.json(products);
  } catch (err) {
    return next(err);
  }
});

productsController.get('/:id', async (req, res, next) => {
  try {
    const product = await productsService.findById(req.params.id);

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
    const deletedProduct = await productsService.deleteProduct(req.params.name);

    return res.json(deletedProduct);
  } catch (err) {
    return next(err);
  }
});

export default productsController;
