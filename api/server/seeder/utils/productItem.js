/* eslint-disable no-console */
const ProductItem = require('../../models/ProductItem');

module.exports = async (products = []) => {
  if (products.length === 0) return [];
  const productsWithQuantities = products.map((product) => ({
    productItem: product,
    quantity: Math.floor(Math.random() * 100)
  }));
  let productItems;
  try {
    productItems = await ProductItem.insertMany(productsWithQuantities);
  } catch (error) {
    console.log(error);
  }
  return productItems;
};
