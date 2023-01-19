import { Router } from 'express';
import Discount from '../../models/discount.js';
import DiscountsService from './discounts.service.js';

const discountsController = Router();
const discountsService = DiscountsService(Discount);

discountsController.post('/', async (req, res, next) => {
  try {
    const discount = await discountsService.createCoupon(req.body);

    return res.json(discount);
  } catch (error) {
    return next(error);
  }
});

export default discountsController;
