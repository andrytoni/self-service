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

ordersController.get('/:_id', async (req, res, next) => {
  try {
    const findById = await orderService.findById(req.params._id);
    return res.json(findById);
  } catch (error) {
    return next(error);
  }
});

ordersController.get('/?owner:table', async (req, res, next) => {
  try {
    const findByTable = await orderService.findByTable(req.params.owner.table);
    return res.json(findByTable);
  } catch (error) {
    return next(error);
  }
});

export default ordersController;
