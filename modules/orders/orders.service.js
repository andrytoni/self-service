import mongoose from 'mongoose';
import Product from '../../models/product.js';
import Discount from '../../models/discount.js';

const OrderService = (Order) => {
  const calculateCoupon = async (orderCoupon, orderProducts) => {
    let discount = {};
    const coupon = await Discount.findOne({
      coupon: orderCoupon.toUpperCase(),
    });
    let totalWithDiscount = 0;

    if (!coupon) throw new Error('Coupon not found.');
    if (Math.sign(new Date() - coupon.validUntil) >= 0 || coupon.quantity < 1) {
      throw new Error('Coupon is no longer valid.');
    }
    if (coupon.discountType == 'PERCENTAGE') {
      if (coupon.value > 100)
        throw new Error('Value cannot be more than 100%.');
    }

    const discountedProducts = orderProducts.map((product) => {
      if (
        (coupon.typeOfProduct.includes(product.type) ||
          coupon.products.some((item) => item.name == product.name)) &&
        coupon.discountType == 'PERCENTAGE'
      ) {
        product.price = product.price * (1 - coupon.value / 100);
        totalWithDiscount += product.price;
      } else {
        totalWithDiscount += product.price;
      }
      return product;
    });

    discount = {
      _id: coupon._id,
      coupon: coupon.coupon,
      value: coupon.value,
      discountType: coupon.discountType,
    };

    if (
      (coupon.typeOfProduct.length < 1 && coupon.products.length < 1) ||
      coupon.discountType == 'COST'
    )
      totalWithDiscount = await calculateDiscount(discount, totalWithDiscount);
    await Discount.findByIdAndUpdate(coupon._id, { $inc: { quantity: -1 } });
    return { totalWithDiscount, discountedProducts, discount };
  };

  const calculateDiscount = async (orderDiscount, orderTotal) => {
    let totalWithDiscount;

    if (/percentage/i.test(orderDiscount.discountType) == true) {
      if (orderDiscount.value > 100)
        throw new Error('Value cannot be more than 100%.');
      totalWithDiscount = orderTotal * (1 - orderDiscount.value / 100);
    } else if (/cost/i.test(orderDiscount.discountType) == true) {
      totalWithDiscount = orderTotal - orderDiscount.value;
      if (totalWithDiscount < 0) totalWithDiscount = 0;
    } else {
      throw new Error('Discount type must be percentage or cost.');
    }
    return totalWithDiscount;
  };

  const validateProducts = async (products) => {
    if (Array.isArray(products) == false) {
      throw new Error('Array of products is required');
    }

    const validatedProducts = [];
    const productIds = products.map((item) => item._id);
    const orderProducts = await Product.find({ '_id': { $in: productIds } });
    let totalValue = 0;

    for (let i = 0; i < products.length; i++) {
      if (orderProducts[i].inventory <= 0) {
        throw new Error(
          'Product ' + orderProducts[i].name + ' is out of stock.'
        );
      }
      if (isNaN(orderProducts[i].price) == true) {
        throw new Error('Price is not a valid number');
      }

      totalValue += orderProducts[i].price;

      validatedProducts.push({
        _id: orderProducts[i]._id,
        name: orderProducts[i].name,
        price: orderProducts[i].price,
        type: orderProducts[i].type,
        obs: products[i].obs || 'n/a',
      });
    }

    return { totalValue, validatedProducts, productIds };
  };

  const createNewOrder = async (order) => {
    if (!order) {
      throw new Error('Parameters are required');
    }
    if (!order.owner._id) {
      order.owner._id = new mongoose.Types.ObjectId();
    }

    const { totalValue, validatedProducts } = await validateProducts(
      order.products
    );
    order.products = validatedProducts;
    order.totalValue = totalValue;

    if (order?.discount && !order?.discount?.coupon) {
      order.totalValue = await calculateDiscount(
        order.discount,
        order.totalValue
      );
    }

    if (order?.discount?.coupon) {
      const { totalWithDiscount, discountedProducts, discount } =
        await calculateCoupon(order.discount.coupon, order.products);
      order.discount = discount;
      order.totalValue = totalWithDiscount;
      order.products = discountedProducts;
    }

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

    return Order.findByIdAndUpdate(id, order, { returnDocument: 'after' });
  };

  const cancelOrder = async (id) => {
    if (!id) {
      throw new Error('ID is required');
    }

    return Order.findByIdAndUpdate(
      id,
      { canceled: true },
      { returnDocument: 'after' }
    );
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
