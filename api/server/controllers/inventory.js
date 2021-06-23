const Inventory = require('../models/Inventory');
const DatabaseError = require('../errors/DatabaseError');

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
