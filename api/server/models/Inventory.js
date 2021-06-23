const mongoose = require('mongoose');
const { UserSchema } = require('./User');
require('./ProductItem');

const InventorySchema = new mongoose.Schema(
  {
    user: UserSchema,
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductItem'
      }
    ]
  },
  { timestamps: true }
);
const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
