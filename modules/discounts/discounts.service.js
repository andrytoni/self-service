import mongoose from 'mongoose';
import Product from '../../models/product.js';

const DiscountsService = (Discount) => {
  const createCoupon = async (coupon) => {
    const createdAt = new Date();
    const validUntil = new Date(coupon.validUntil);
    const sameCoupons = await Discount.find({
      coupon: { $regex: coupon.coupon, $options: 'i' },
    });

    if (sameCoupons) {
      sameCoupons.forEach((element) => {
        if (Math.sign(createdAt - element.validUntil) < 0) {
          throw new Error('A coupon with the same name is still valid.');
        }
      });
    }
    if (!coupon) {
      throw new Error('Parameters are required');
    }
    if (/percentage|cost/i.test(coupon.discountType) == false) {
      throw new Error('Discount type must be percentage or cost.');
    }
    if (/percentage/i.test(coupon.discountType) == true && coupon.value > 100) {
      throw new Error('Value cannot be more than 100%.');
    }
    if (Math.sign(createdAt - validUntil) >= 0) {
      throw new Error(
        'Coupon expiration date cannot be less or equal to the creation date.'
      );
    }
    if (coupon?.products) {
      const productIds = coupon.products.map((item) => {
        if (item?.name && !item?._id) {
          throw new Error('Product ID must be included.');
        }
        return item._id;
      });
      const products = await Product.find({
        '_id': { $in: productIds },
      }).select('_id name');
      coupon.products = products;
    }
    if (
      (coupon?.products.length > 0 || coupon?.typeOfProduct.length > 0) &&
      /percentage/i.test(coupon.discountType) == false
    ) {
      throw new Error(
        'For discount on especific products, discount type must be in percentage.'
      );
    }

    coupon.validUntil = validUntil;

    return Discount(coupon).save();
  };

  const findCoupon = async (coupon) => {
    if (!coupon) {
      throw new Error('Coupon name is required.');
    }

    return Discount.findOne({ coupon: { $regex: coupon, $options: 'i' } });
  };

  return { createCoupon, findCoupon };
};

export default DiscountsService;
