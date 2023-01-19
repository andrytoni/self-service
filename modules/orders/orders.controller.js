import { Router } from 'express';
import Order from '../../models/order.js';
import OrdersService from './orders.service.js';

const ordersController = Router();
const ordersService = OrdersService(Order);

ordersController.get('/', async (req, res, next) => {
  try {
    const orders = await ordersService.find(req.query);

    return res.json(orders);
  } catch (error) {
    return next(error);
  }
});

ordersController.get('/:_id', async (req, res, next) => {
  try {
    const order = await ordersService.findById(req.params._id);

    return res.json(order);
  } catch (error) {
    return next(error);
  }
});

ordersController.post('/', async (req, res, next) => {
  try {
    const newOrder = await ordersService.createNewOrder(req.body);

    return res.json(newOrder);
  } catch (error) {
    return next(error);
  }
});

ordersController.put('/:_id', async (req, res, next) => {
  try {
    const updatedOrder = await ordersService.updateOrder(
      req.params._id,
      req.body
    );

    return res.json(updatedOrder);
  } catch (error) {
    return next(error);
  }
});

ordersController.put('/cancel/:_id', async (req, res, next) => {
  try {
    const canceledOrder = await ordersService.cancelOrder(req.params._id);

    return res.json(canceledOrder);
  } catch (error) {
    return next(error);
  }
});

export default ordersController;
