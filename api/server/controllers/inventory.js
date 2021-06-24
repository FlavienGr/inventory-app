const Inventory = require('../models/Inventory');
const ProductItem = require('../models/ProductItem');
const Product = require('../models/Product');

const DatabaseError = require('../errors/DatabaseError');
const DataNotAllowedError = require('../errors/DataNotAllowedError');

// @desc   get an inventory
// @route  get /api/v1/inventory
// @access Public

exports.getInventory = async (_req, res, next) => {
  try {
    const inventory = await Inventory.find().populate({
      path: 'products',
      populate: {
        path: 'productItem'
      }
    });
    if (inventory === null) {
      return res.status(200).json({ success: true, data: [] });
    }
    return res.status(200).json({ success: true, data: inventory });
  } catch (error) {
    next(new DatabaseError());
  }
};

// @desc   add product to an inventory
// @route  post /api/v1/inventory/{productId}?quantity={number}
// @access Public

exports.addProductItemToInventory = async (req, res, next) => {
  const { productId = null } = req.params;
  const { quantity = 0 } = req.query;

  if (productId === null) {
    return next(new DataNotAllowedError('Please add a product'));
  }
  if (productId.length < 24) {
    return next(new DataNotAllowedError('Id product not allowed'));
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(quantity) && quantity < 0) {
    return next(new DataNotAllowedError('Quantity value not allowed'));
  }
  try {
    const isProductItemExists = await ProductItem.findOne({
      productItem: productId
    });
    if (isProductItemExists) {
      return next(
        new DataNotAllowedError('The product is already in your inventory')
      );
    }
    const isProductExists = await Product.findById(productId).exec();

    if (!isProductExists) {
      return next(new DataNotAllowedError("The product doesn't exists"));
    }
    const newProductItem = new ProductItem({
      productItem: isProductExists,
      quantity
    });

    await newProductItem.save();
    const [inventory] = await Inventory.find().populate({
      path: 'products'
    });
    if (inventory === null) {
      return next(new DataNotAllowedError('No Inventory'));
    }
    inventory.products.push(newProductItem);
    await inventory.save();

    return res.status(200).json({ success: true, data: newProductItem });
  } catch (error) {
    console.log(error);
    next(new DatabaseError());
  }
};

// @desc   delete product to an inventory
// @route  delete /api/v1/inventory/{productId}
// @access Public

exports.deleteProductItemInventory = async (req, res, next) => {
  const { productId = null } = req.params;

  if (productId === null) {
    return next(new DataNotAllowedError('Please add a product'));
  }
  if (productId.length < 24) {
    return next(new DataNotAllowedError('Id product not allowed'));
  }

  try {
    const productItem = await ProductItem.deleteOne({ _id: productId }).exec();
    if (productItem.ok !== 1) {
      return next(new DatabaseError());
    }

    return res.status(200).json({ success: true, data: [] });
  } catch (error) {
    next(new DatabaseError());
  }
};
// @desc   update product to an inventory
// @route  update /api/v1/inventory/{productId}
// @access Public

exports.updateProductItemInventory = async (req, res, next) => {
  const { productId = null } = req.params;
  const { quantity = 0 } = req.query;

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(quantity) && quantity < 0) {
    return next(new DataNotAllowedError('Quantity value not allowed'));
  }
  if (productId === null) {
    return next(new DataNotAllowedError('Please add a product'));
  }
  if (productId.length < 24) {
    return next(new DataNotAllowedError('Id product not allowed'));
  }

  try {
    const newProductItem = await ProductItem.findOne({ _id: productId }).exec();

    if (newProductItem === null) {
      return next(new DataNotAllowedError('No product item related'));
    }
    newProductItem.quantity = quantity;
    await newProductItem.save();

    return res.status(200).json({ success: true, data: newProductItem });
  } catch (error) {
    next(new DatabaseError());
  }
};
