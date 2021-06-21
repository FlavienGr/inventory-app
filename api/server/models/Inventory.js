const mongoose = require('mongoose');
const { UserSchema } = require('./User');

const InventorySchema = new mongoose.Schema(
  {
    user: UserSchema,
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product'
        },
        quantity: {
          type: Number,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);
const User = mongoose.model('Inventory', InventorySchema);

module.exports = User;
