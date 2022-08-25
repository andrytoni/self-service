import mongoose from 'mongoose';

const orderService = (Order) => {
  const calculateTotal = async (products) => {
    if (Array.isArray(products) == false) {
      throw new Error('Array of products is required');
    }
    if (!products) {
      throw new Error('Parameters are required');
    }
    const priceValidator = products.map((products) => {
      if (typeof products.price == 'string') {
        throw new Error('Price cant be a string');
      }
    });
    let total = 0;
    total = products.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      0
    );

    return total;
  };

  const createNewOrder = async (order) => {
    if (!order) {
      throw new Error('Parameters are required');
    }
    if (!order.owner._id) {
      order.owner._id = new mongoose.Types.ObjectId();
    }
    order.totalValue = await calculateTotal(order.products);

    return new Order(order).save();
  };

  const find = async (query) => {
    const { table, date, status, ownerId } = query;
    const queryFinal = {};

    if (table) queryFinal['owner.table'] = table;
    if (status) queryFinal.status = status;
    if (date) {
      const startDate = new Date(date);
      const finalDate = new Date(date);
      finalDate.setDate(startDate.getDate() + 1);

      queryFinal.createdAt = { $gte: startDate, $lte: finalDate };
    }
    if (ownerId) queryFinal['owner._id'] = ownerId;

    return Order.find(queryFinal);
  };

  const findAllOrders = async () => {
    return Order.find();
  };
  const findById = async (id) => {
    if (!id) {
      throw new Error('Id is required');
    }
    return Order.findById(id);
  };

  const findByTable = async (table) => {
    console.log(table);

    if (!table) {
      throw new Error('Table param is required');
    }
    return Order.find({ 'owner.table': table });
  };

  const findByOwnerId = async (ownerId) => {
    if (!ownerId) {
      throw new Error('Id is required');
    }
    return Order.find({ 'owner._id': ownerId });
  };

  const findByStatus = async (statusNum) => {
    // if (!statusNum) {
    //   throw new Error('Status is required');
    // }
    return Order.find({ status: statusNum });
  };

  const findByDate = async (date) => {
    if (!date) {
      throw new Error('Date is required');
    }

    const startDate = new Date(date);
    const finalDate = new Date(date);
    finalDate.setHours(44);
    finalDate.setMinutes(59);
    finalDate.setSeconds(59);

    return Order.find({ createdAt: { $gte: startDate, $lte: finalDate } });
  };

  const updateOrder = async (id, order) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!order) {
      throw new Error('Update parameter is required');
    }
    return Order.findByIdAndUpdate(id, order);
  };

  const cancelOrder = async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }

    return Order.findByIdAndUpdate(id, { canceled: true });
  };

  return {
    createNewOrder,
    findAllOrders,
    findById,
    findByTable,
    findByOwnerId,
    findByStatus,
    findByDate,
    updateOrder,
    cancelOrder,
    find,
  };
};

export default orderService;
