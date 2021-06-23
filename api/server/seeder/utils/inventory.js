/* eslint-disable no-console */
const Inventory = require('../../models/Inventory');

module.exports = async (user, productItems = []) => {
  let newInventory;
  try {
    newInventory = new Inventory({
      user,
      products: productItems
    });
    newInventory = await newInventory.save();
  } catch (error) {
    console.log(error);
  }
  return newInventory;
};
