const productService = (Product) => {
  const findAll = async () => {
    return Product.find();
  };

  const findByName = async (name) => {
    return Product.find({ name: name.toUpperCase() });
  };

  const createNewProduct = async (reqBody) => {
    return new Product(reqBody).save();
  };

  const updateProduct = async (name, reqBody) => {
    return Product.findOneAndUpdate({ name: name.toUpperCase() }, reqBody);
  };

  const deleteProduct = async (name) => {
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
