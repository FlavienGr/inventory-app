/* eslint-disable no-console */
const { connect, disconnect, dropDatabase } = require('../database/index');

const userSeeder = require('./utils/user');
const productSeeder = require('./utils/product');
const productItemSeeder = require('./utils/productItem');
const inventorySeeder = require('./utils/inventory');

// data to seed
const productsListData = require('../../data/product.json');
const singleUserData = require('../../data/user.json');

// connect DB
connect();

const seeder = async (userData, productsData) => {
  await dropDatabase();
  const user = await userSeeder(userData);
  const products = await productSeeder(productsData);
  const productItems = await productItemSeeder(products);
  console.log(productItems);
  await inventorySeeder(user, productItems);

  return disconnect();
};

seeder(singleUserData, productsListData);
