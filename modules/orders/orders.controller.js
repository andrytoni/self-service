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
  //Qual outra forma de acessar além de criar essa variável?
  const table = req.query['table'];
  const ownerId = req.query['ownerId'];
  const status = req.query['status'];
  const date = req.query['date'];

  if (table) {
    try {
      const findByTable = await orderService.findByTable(req.query.table);
      return res.json(findByTable);
    } catch (error) {
      return next(error);
    }
  } else if (ownerId) {
    try {
      const findByOwnerId = await orderService.findByOwnerId(req.query.ownerId);
      return res.json(findByOwnerId);
    } catch (error) {
      return next(error);
    }
  } else if (status) {
    try {
      const findByStatus = await orderService.findByStatus(req.query.status);
      return res.json(findByStatus);
    } catch (error) {
      return next(error);
    }
  } else if (date) {
    try {
      const findByDate = await orderService.findByDate(req.query.date);
      return res.json(findByDate);
    } catch (error) {
      return next(error);
    }
  } else {
    try {
      const findAllOrders = await orderService.findAllOrders();
      return res.json(findAllOrders);
    } catch (error) {
      return next(error);
    }
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

// ordersController.get('/owner/table/:table', async (req, res, next) => {
//   try {
//     const findByTable = await orderService.findByTable(req.params.table);
//     return res.json(findByTable);
//   } catch (error) {
//     return next(error);
//   }
// });

// ordersController.get('/owner/id/:id', async (req, res, next) => {
//   try {
//     const findByOwnerId = await orderService.findByOwnerId(req.params.id);
//     return res.json(findByOwnerId);
//   } catch (error) {
//     return next(error);
//   }
// });

// ordersController.get('/status/:status', async (req, res, next) => {
//   try {
//     const findByStatus = await orderService.findByStatus(req.params.status);
//     return res.json(findByStatus);
//   } catch (error) {
//     return next(error);
//   }
// });

// ordersController.get('/date/:date', async (req, res, next) => {
//   try {
//     const findByDate = await orderService.findByDate(req.params.date);
//     return res.json(findByDate);
//   } catch (error) {
//     return next(error);
//   }
// });

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
