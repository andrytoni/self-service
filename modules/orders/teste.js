import ordersService from './orders.service.js';
import Order from '../../models/order.js';

const orderService = ordersService(Order);

const order1 = {
  'products': [
    {
      '_id': '62ed5300adb3763d7b06dd17',
      'name': 'Coca',
      'price': 10,
    },
    {
      '_id': '62ed5300adb3763d7b06dd17',
      'name': 'Coca',
      'price': 10,
    },
  ],
  'owner': {
    '_id': '62f6c99bb8891830c4d78daf',
  },
  'table': 6,
  '_id': '62fd324570a7199362e9eef2',
};

const newOrder = await orderService.createNewOrder(order1);
console.log(newOrder);

const idd = newOrder._id;
console.log('id= ' + idd);

const findById = await orderService.findById(idd);
console.log(findById);
