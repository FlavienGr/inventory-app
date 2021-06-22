const Product = require('../models/Product');
const DatabaseError = require('../errors/DatabaseError');
const DataNotAllowedError = require('../errors/DataNotAllowedError');
// @desc   get all products
// @route  get /api/v1/products
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
// @route  get /api/v1/products/{id}
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

// @desc   store a product
// @route  post /api/v1/products
// @access Public

exports.storeProduct = async (req, res, next) => {
  const product = new Product(req.body);
  try {
    const isProductExists = await Product.find({ name: product.name });

    if (isProductExists.length > 0) {
      return next(
        new DataNotAllowedError('This article name is already taken')
      );
    }
    await product.save();

    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(new DatabaseError());
  }
};

// @desc   update a product
// @route  put /api/v1/products/{id}
// @access Public

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const product = await Product.findOne({ _id: id }).select('-__v');

    if (product === null) {
      return next(new DataNotAllowedError("This product doesn't exists"));
    }
    product.name = name;
    product.description = description;
    await product.save();

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(new DatabaseError());
  }
};

// @desc   delete a product
// @route  delete /api/v1/products/{id}
// @access Public

exports.deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findOne({ _id: id });

    if (product === null) {
      return next(new DataNotAllowedError("This product doesn't exists"));
    }
    await Product.deleteOne({ _id: id });

    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    next(new DatabaseError());
  }
};
