const express = require('express');

const router = express.Router();

const { getAllProducts, getAProduct } = require('../controllers/product');

router.route('/').get(getAllProducts);

router.route('/:id').get(getAProduct);

module.exports = router;
