import Product from '../../models/product.js';

const productService = (Product) => {
  const findAll = async () => {
    return Product.find();
  };

  const findByName = async (name) => {
    if (!name) {
      throw new Error('Name is required');
    }
    return Product.find({ name: name.toUpperCase() });
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
    return Product.findOneAndUpdate({ name: name.toUpperCase() }, reqBody);
  };

  const deleteProduct = async (name) => {
    if (!name) {
      throw new Error('Name is required');
    }

    return Product.deleteOne({ name: name.toUpperCase() });
  };

  return {
    findAll,
    findByName,
    createNewProduct,
    updateProduct,
    deleteProduct
  };
};

export default productService;
