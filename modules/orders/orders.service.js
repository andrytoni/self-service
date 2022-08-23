import mongoose from 'mongoose';

const orderService = (Order) => {
  const calculateTotal = async (reqBody) => {
    if (!reqBody) {
      throw new Error('Parameters are required');
    }
    let total = 0;
    for (let i = 0; i < reqBody.products.length; i++) {
      total += reqBody.products[i].price;
    }

    return total;
  };

  const createNewOrder = async (reqBody) => {
    if (!reqBody) {
      throw new Error('Parameters are required');
    }
    if (!reqBody.owner._id) {
      reqBody.owner._id = new mongoose.Types.ObjectId();
    }
    reqBody.totalValue = await calculateTotal(reqBody);

    return new Order(reqBody).save();
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
    return Order.find({ createdAt: date });
  };

  const updateOrder = async (id, reqBody) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!reqBody) {
      throw new Error('Update parameter is required');
    }
    return Order.findByIdAndUpdate(id, reqBody);
  };

  const cancelOrder = async (id, cancelParam) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!cancelParam) {
      throw new Error('Cancel parameter is required');
    }
    return Order.findOneAndUpdate({ _id: id }, cancelParam);
  };

  return {
    createNewOrder,
    calculateTotal,
    findAllOrders,
    findById,
    findByTable,
    findByOwnerId,
    findByStatus,
    findByDate,
    updateOrder,
    cancelOrder,
  };
};

export default orderService;
