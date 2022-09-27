import mongoose from 'mongoose';

const OrderService = (Order) => {
  const calculateTotal = (products) => {
    if (Array.isArray(products) == false) {
      throw new Error('Array of products is required');
    }

    const total = products.reduce((previousValue, currentValue) => {
      if (isNaN(currentValue.price) == true) {
        throw new Error('Price is not a valid number');
      }

      const current = Number(currentValue.price);
      return previousValue + current;
    }, 0);

    return total;
  };

  const createNewOrder = async (order) => {
    if (!order) {
      throw new Error('Parameters are required');
    }
    if (!order.owner._id) {
      order.owner._id = new mongoose.Types.ObjectId();
    }
    order.totalValue = calculateTotal(order.products);

    return new Order(order).save();
  };

  const find = async (query) => {
    const { table, date, status, ownerId } = query;
    const finalQuery = {};

    if (table) finalQuery['owner.table'] = table;
    if (status) finalQuery.status = status;
    if (date) {
      const startDate = new Date(date);
      const finalDate = new Date(date);
      finalDate.setDate(startDate.getDate() + 1);
      finalQuery.createdAt = { $gte: startDate, $lt: finalDate };
    }
    if (ownerId) finalQuery['owner._id'] = ownerId;

    return Order.find(finalQuery);
  };

  const findById = async (id) => {
    if (!id) {
      throw new Error('Id is required');
    }

    return Order.findById(id);
  };

  const findByTable = async (table) => {
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
    if (!statusNum) {
      throw new Error('Status is required');
    }

    return Order.find({ status: statusNum });
  };

  const findByDate = async (date) => {
    if (!date) {
      throw new Error('Date is required');
    }
    const startDate = new Date(date);
    const finalDate = new Date(date);
    finalDate.setDate(startDate.getDate() + 1);

    return Order.find({ createdAt: { $gte: startDate, $lt: finalDate } });
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

export default OrderService;
