import { Router } from 'express';

const productsController = Router();

const products = [
  {
    'name': 'Batata frita',
    'type': 'Porção',
    'price': 15,
    'description': 'Uma porção de batata frita',
  },
  {
    'name': 'Nuggets',
    'type': 'Porção',
    'price': 19,
    'description': 'Uma porção de nuggets de frango',
  },
];

productsController.get('/', (req, res) => {
  return res.json(products);
});

productsController.get('/:name', (req, res) => {
  /* 
  req = {
    params: {
      name: "Batata Frita"
    }
  }

  */
  const productToFind = req.params.name.toUpperCase();

  const product = products.find((product) => {
    return product.name.toUpperCase() === productToFind;
  });
  return res.json(product);
});

productsController.post('/', (req, res) => {
  const product = req.body;
  products.push(product);
  return res.json(product);
});

productsController.put('/:name', (req, res) => {
  const productName = req.params.name.toUpperCase();
  const productIndex = products.findIndex(
    (product) => product.name.toUpperCase() === productName
  );

  products[productIndex] = req.body;

  return res.json(products[productIndex]);
});

productsController.delete('/:name', (req, res) => {
  const productName = req.params.name.toUpperCase();
  const productIndex = products.findIndex(
    (product) => product.name.toUpperCase() === productName
  );

  products.splice(productIndex, 1);
  return res.json(products);
});

export default productsController;
