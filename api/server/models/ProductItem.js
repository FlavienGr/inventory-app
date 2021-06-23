const mongoose = require('mongoose');

const ProductItemSchema = new mongoose.Schema({
  productItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number,
    required: true
  }
});

const ProductItem = mongoose.model('ProductItem', ProductItemSchema);

module.exports = ProductItem;
