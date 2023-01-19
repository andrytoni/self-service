import 'dotenv/config';
import express from 'express';
import productsController from './modules/products/products.controller.js';
import ordersController from './modules/orders/orders.controller.js';
import usersController from './modules/users/users.controller.js';
import authenticationController from './modules/authentication/authentication.controller.js';
import discountsController from './modules/discounts/discounts.controller.js';
import User from './models/user.js';
import AuthenticationService from './modules/authentication/authentication.service.js';
import mongoose from 'mongoose';
import path from 'node:path';
import fs from 'fs/promises';

const { authenticateReq, validatePermission } = AuthenticationService(User);
let permissions;
const permissionsPath = path.resolve('permissions.json');

mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
  },
  async () => {
    try {
      const permissionsJson = await fs.readFile(permissionsPath);
      permissions = JSON.parse(permissionsJson);
    } catch (error) {
      permissions = await mongoose.connection
        .collection('permissions')
        .findOne();
    }
  }
);

const PORT = process.env.PORT || 3000;

const app = express();
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(500).json({ error: err.message });
};

const routePermissions = (req, res, next) => {
  req.permissions = permissions;

  return next();
};

app.use(express.json());
app.use('/login', authenticationController);
app.use(
  '/products',
  authenticateReq,
  routePermissions,
  validatePermission,
  productsController
);
app.use(
  '/orders',
  authenticateReq,
  routePermissions,
  validatePermission,
  ordersController
);
app.use(
  '/users',
  authenticateReq,
  routePermissions,
  validatePermission,
  usersController
);
app.use('/discounts', discountsController);

app.get('/', (req, res) => {
  return res.send(`Hello World`);
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

// req.method POST
// req.path /
// req.baseUrl /products
