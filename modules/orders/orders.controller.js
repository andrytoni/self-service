import { Router } from 'express';
import Order from '../../models/order.js';
import ordersService from './orders.service.js';

const ordersController = Router();
const orderService = ordersService(Order);

ordersController.post('/', async (req, res, next) => {
  try {
    const newOrder = await orderService.createNewOrder(req.body);
    return res.json(newOrder);
  } catch (err) {
    return next(err);
  }
});

ordersController.get('/', async (req, res, next) => {
  try {
    const order = req.query;
    const findOrder = await orderService.find(order);
    return res.json(findOrder);
  } catch (error) {
    return next(error);
  }
});

ordersController.get('/:_id', async (req, res, next) => {
  try {
    const findById = await orderService.findById(req.params._id);
    return res.json(findById);
  } catch (error) {
    return next(error);
  }
});

ordersController.put('/:_id', async (req, res, next) => {
  try {
    const update = await orderService.updateOrder(req.params._id, req.body);

    return res.json(update);
  } catch (err) {
    return next(err);
  }
});

ordersController.put('/cancel/:_id', async (req, res, next) => {
  try {
    const cancel = await orderService.cancelOrder(req.params._id);

    return res.json(cancel);
  } catch (err) {
    return next(err);
  }
});

export default ordersController;
