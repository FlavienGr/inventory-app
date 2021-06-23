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

const [productOne, productTwo, productThree] = productsListData;

let newProduct;
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

  test('It should add a product with quantity 6 to the inventory - length -> 3', async () => {
    const product = await request(app)
      .post('/api/v1/products')
      .send(productThree);

    // record the new product
    newProduct = product.body.data;
    const response = await request(app).post(
      `/api/v1/inventory/${newProduct._id}?quantity=6`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.data.quantity).toBe(6);
  });

  test('It should fail to add a product in an inventory if already exists', async () => {
    const response = await request(app).post(
      `/api/v1/inventory/${newProduct._id}?quantity=6`
    );
    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].message).toBe(
      'The product is already in your inventory'
    );
  });

  test("It should fail if the product doesn't exists", async () => {
    const response = await request(app).post(
      `/api/v1/inventory/60d33dc69d4e920ca3f23212?quantity=6`
    );

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].message).toBe("The product doesn't exists");
  });

  test('It should fail if the id product is too small', async () => {
    const response = await request(app).post(
      `/api/v1/inventory/123456?quantity=6`
    );

    expect(response.statusCode).toBe(400);
    expect(response.body.errors[0].message).toBe('Id product not allowed');
  });
});
