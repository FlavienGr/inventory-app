const Product = require('../models/Product');
const DatabaseError = require('../errors/DatabaseError');

// @desc   get all products
// @route  delete /api/v1/products
// @access Public

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().select('-__v');

    if (!products) {
      return res.status(200).json({ success: true, data: [] });
    }
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(new DatabaseError());
  }
};

// @desc   get a product
// @route  delete /api/v1/products/{id}
// @access Public

exports.getAProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id }).select('-__v');

    if (!product) {
      return res.status(200).json({ success: true, data: {} });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(new DatabaseError());
  }
};
