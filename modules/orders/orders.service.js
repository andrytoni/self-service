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

    reqBody.totalValue = await calculateTotal(reqBody);

    return new Order(reqBody); //.save();
  };

  const findById = async (id) => {
    if (!id) {
      throw new Error('Id is required');
    }
    return Order.find({ _id: id });
  };

  const findByTable = async (table) => {
    if (!table) {
      throw new Error('Table param is required');
    }
    return Order.find({ owner: { table: table } });
  };

  return {
    createNewOrder,
    calculateTotal,
    findById,
    findByTable,
  };
};

export default orderService;
