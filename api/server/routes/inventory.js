const express = require('express');

const router = express.Router();

const { getInventory } = require('../controllers/inventory');

router.route('/').get(getInventory);

module.exports = router;
