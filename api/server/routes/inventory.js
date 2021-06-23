const express = require('express');

const router = express.Router();

const {
  getInventory,
  addProductItemToInventory
} = require('../controllers/inventory');

router.route('/').get(getInventory);

router.route('/:productId').post(addProductItemToInventory);

module.exports = router;
