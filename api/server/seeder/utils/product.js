/* eslint-disable no-console */
const Product = require('../../models/Product');

module.exports = async (productsList) => {
  let productsSaved;
  try {
    productsSaved = await Product.insertMany(productsList);
  } catch (error) {
    console.log(error);
  }
  return productsSaved;
};
