const express = require('express');

const router = express.Router();

const {
  getInventory,
  addProductItemToInventory,
  deleteProductItemInventory,
  updateProductItemInventory
} = require('../controllers/inventory');

router.route('/').get(getInventory);

router
  .route('/:productId')
  .post(addProductItemToInventory)
  .delete(deleteProductItemInventory)
  .put(updateProductItemInventory);

module.exports = router;
