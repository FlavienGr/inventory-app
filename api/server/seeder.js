/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

const { User } = require('./models/User');
const Product = require('./models/Product');
const Inventory = require('./models/Inventory');

// data to seed
const productsListData = require('../data/product.json');
const singleUserData = require('../data/user.json');

// env vars
if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.development`)
  });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.test`)
  });
}
// get an instance of mongoose
const url = process.env.MONGO_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};

mongoose.connect(url, options);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("we're connected!"));

// delete docs in db
const clearDbBeforeInsert = async () => {
  await db.dropDatabase();
};

// create one user
const seedUserDB = async (userData) => {
  let newUser;
  try {
    newUser = new User(userData);
    await newUser.save();
  } catch (error) {
    console.log(error);
  }
  return newUser;
};

// create a list of products
const seedProductsDB = async (productsList) => {
  let productsSaved;
  try {
    productsSaved = await Product.insertMany(productsList);
  } catch (error) {
    console.log(error);
  }
  return productsSaved;
};

// create an inventory with a user and a list of products & quantity
const seedForInventory = async (user, products) => {
  const productWithQuantity = products.map((product) => ({
    product: product.id,
    quantity: Math.floor(Math.random() * 100)
  }));
  try {
    const newInventory = new Inventory({
      user,
      products: productWithQuantity
    });
    await newInventory.save();
  } catch (error) {
    console.log(error);
  }
};

// run all the previous functions async and close the db connection
const seeder = async (userData, productsData) => {
  await clearDbBeforeInsert();
  const user = await seedUserDB(userData);
  const products = await seedProductsDB(productsData);
  await seedForInventory(user, products);

  return db.close();
};
seeder(singleUserData, productsListData);
