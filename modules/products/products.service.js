const productsService = (Product) => {
  const find = async (query) => {
    const { name, type, price, inventory } = query;
    const finalQuery = {};

    if (name) finalQuery.name = { $regex: name, $options: 'i' };
    if (type) finalQuery.type = { $regex: type, $options: 'i' };
    if (price) finalQuery.price = { $lte: price };
    if (inventory) finalQuery.inventory = { $lte: inventory };

    return Product.find(finalQuery);
  };

  const findById = async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }
    return Product.findById(id);
  };

  const createNewProduct = async (reqBody) => {
    if (!reqBody) {
      throw new Error('Parameters are required');
    }
    return new Product(reqBody).save();
  };

  const updateProduct = async (name, reqBody) => {
    if (!name) {
      throw new Error('Name is required');
    }
    if (!reqBody) {
      throw new Error('Update parameter is required');
    }
    return Product.findOneAndUpdate({ name: name.toUpperCase() }, reqBody, {
      returnDocument: 'after',
    });
  };

  const deleteProduct = async (name) => {
    if (!name) {
      throw new Error('Name is required');
    }

    return Product.deleteOne({ name: name.toUpperCase() });
  };

  return {
    find,
    findById,
    createNewProduct,
    updateProduct,
    deleteProduct,
  };
};

export default productsService;
