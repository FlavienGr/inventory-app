const express = require('express');

const router = express.Router();

const {
  getAllProducts,
  getAProduct,
  storeProduct,
  deleteProduct,
  updateProduct
} = require('../controllers/product');

const { projectValidationData } = require('../middlewares/valideData/project');

const allowData = require('../middlewares/security/allowData');

router
  .route('/')
  .get(getAllProducts)
  .post(
    projectValidationData,
    allowData(['name', 'description']),
    storeProduct
  );

router
  .route('/:id')
  .get(getAProduct)
  .delete(deleteProduct)
  .put(
    projectValidationData,
    allowData(['name', 'description']),
    updateProduct
  );

module.exports = router;
