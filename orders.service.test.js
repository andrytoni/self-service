import ordersService from './modules/orders/orders.service.js';
import Order from './models/order.js';
import order from './models/order.js';

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
    'table': 6,
  },
  'status': 0,

  'createdAt': '2022-08-20T20:40:03.192+00:00',

  '_id': '62fd324570a7199362e9eef2',
};

const order2 = {
  'products': [
    {
      '_id': '62f6b415b2f6eec6825c234c',
      'name': 'Batata Frita',
      'price': 18,
    },
    {
      '_id': '62fbb60572ccaaac2bd45a90',
      'name': 'X-Salada',
      'price': 15,
    },
  ],
  'owner': {
    '_id': '62f6c99bb8891830c4d78daf',
    'table': 6,
  },
  'status': 0,

  '_id': '62fbe8eb6ad0495107b24be8',
};

const orderServiceTest = async () => {
  //Creating Order
  // const newOrder = await orderService.createNewOrder(order1);
  // const newOrder2 = await orderService.createNewOrder(order2);
  // console.log(newOrder);
  // console.log(newOrder2);
  //
  //Find All orders
  // const findAllOrders = await orderService.findAllOrders();
  // console.log(findAllOrders);
  //
  //Find order by Order Id
  // const idd = newOrder._id;
  // console.log('id= ' + idd);
  // const findById = await orderService.findById(idd);
  // console.log(findById);
  //
  //Find orders by Owner Table
  // const table = newOrder.owner.table;
  // console.log(table);
  // const findByTable = await orderService.findByTable(table);
  // console.log(findByTable);
  //
  //Find orders by Owner Id
  // const idd = newOrder.owner._id;
  // console.log('id= ' + idd);
  // const findByOwnerId = await orderService.findByOwnerId(order1.owner._id);
  // console.log(findByOwnerId);
  //
  //Find orders by Status
  // const statusNum = order1.status;
  // console.log(statusNum);
  // const findByStatus = await orderService.findByStatus(statusNum);
  // console.log(findByStatus);
  //
  // FInd orders by date
  // const findByDate = await orderService.findByDate();
  // console.log(findByDate);
  //
  //Update order
  //const updateOrder = await orderService.updateOrder(order1._id, { status: 1 });
  //
  //Cancel Order
  // const cancelOrder = await orderService.cancelOrder(order1._id, {
  //   canceled: true,
  // });
};

export default orderServiceTest;

// arrumar calculate total, mudar validação de number, colocar validação no reduce,
// retirar async await do calculate total
// arrumar data
// padronizar espaços e errors

// const numbers = [
//   { name: 'bla bla', price: 'sdfsdfsdf' },
//   { name: 'bla bla', price: 200 },
//   { name: 'bla bla', price: 300 },
//   { name: 'bla bla', price: 400 },
//   { name: 'bla bla', price: '500' },
// ];
// // const numbers = [100, 200, 300, 400, '500'];
// const num2 = 100;

// const calculateTotal = (products) => {
//   if (Array.isArray(products) == false) {
//     throw new Error('Array of products is required');
//   }

//   let total = products.reduce((previousValue, currentValue) => {
//     if (isNaN(currentValue.price) == true) {
//       throw new Error('Price is not a valid number');
//     }

//     let current = Number(currentValue.price);
//     return previousValue + current;
//   }, 0);

//   return total;
// };

// console.log(calculateTotal(numbers));
