import mongoose from 'mongoose';

const orderService = (Order) => {
  const calculateTotal = async (products) => {
    if (!products) {
      throw new Error('Parameters are required');
    }
    let total = 0;
    for (let i = 0; i < products.length; i++) {
      total += products[i].price;
    }

    return total;
  };

  const createNewOrder = async (orderReq) => {
    if (!orderReq) {
      throw new Error('Parameters are required');
    }
    if (!orderReq.owner._id) {
      orderReq.owner._id = new mongoose.Types.ObjectId();
    }
    orderReq.totalValue = await calculateTotal(orderReq.products);

    return new Order(orderReq).save();
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

  const updateOrder = async (id, orderReq) => {
    if (!id) {
      throw new Error('ID is required');
    }
    if (!orderReq) {
      throw new Error('Update parameter is required');
    }
    return Order.findByIdAndUpdate(id, orderReq);
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
  };
};

export default orderService;
