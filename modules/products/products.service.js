import { Op } from 'sequelize';
const productsService = (Product) => {
  const find = async (query) => {
    const { name, type, price, inventory } = query;
    const finalQuery = {};

    if (name) finalQuery.name = name.toUpperCase();
    if (type) finalQuery.type = type.toUpperCase();
    if (price) finalQuery.price = { [Op.lte]: price };
    if (inventory) finalQuery.inventory = { [Op.lte]: inventory };

    return Product.findAll({ where: finalQuery });
  };

  const findById = async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }
    return Product.findByPk(id);
  };

  const createNewProduct = async (product) => {
    if (!product) {
      throw new Error('Parameters are required');
    }
    if (product.name) product.name.toUpperCase();

    return await Product.create(product);
  };

  const updateProduct = async (name, update) => {
    if (!name) {
      throw new Error('Name is required');
    }
    if (!update) {
      throw new Error('Update parameter is required');
    }

    return Product.update(update, { where: { name: name.toUpperCase() } });
  };

  const deleteProduct = async (name) => {
    if (!name) {
      throw new Error('Name is required');
    }

    return Product.destroy({ where: { name: name.toUpperCase() } });
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
