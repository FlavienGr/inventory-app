/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const { connect, disconnect, dropDatabase } = require('../database/index');

// seed functions
const productSeeder = require('../seeder/utils/product');
const userSeeder = require('../seeder/utils/user');
const productItemSeeder = require('../seeder/utils/productItem');
const inventorySeeder = require('../seeder/utils/inventory');

// data to seed
const productsListData = require('../../data/product.json');
const singleUserData = require('../../data/user.json');

const [productOne, productTwo] = productsListData;

beforeAll(async () => {
  connect();
  await dropDatabase();
  const user = await userSeeder(singleUserData);
  const products = await productSeeder([productOne, productTwo]);
  const productItems = await productItemSeeder(products);

  await inventorySeeder(user, productItems);
});

afterAll((done) => {
  disconnect(done);
});

describe('Test the api/v1/inventory path', () => {
  test('It should response the GET method with an inventory of 2 products', async () => {
    const response = await request(app).get('/api/v1/inventory');
    expect(response.statusCode).toBe(200);
    expect(response.body.data[0].products).toHaveLength(2);
  });
});
