/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const { connect, disconnect, dropDatabase } = require('../database/index');
const productSeeder = require('../seeder/utils/product');

// data to seed
const [
  productOne,
  productTwo,
  productThree
] = require('../../data/product.json');

let productToDelete;

beforeAll(async () => {
  connect();
  await dropDatabase();
  await productSeeder([productOne, productTwo]);
});

afterAll((done) => {
  disconnect(done);
});

describe('Test the api/v1/products path', () => {
  test('It should response the GET method with 2 products', async () => {
    const response = await request(app).get('/api/v1/products');

    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveLength(2);
  });

  test('It should add a product', async () => {
    const response = await request(app)
      .post('/api/v1/products')
      .send(productThree);

    expect(response.statusCode).toEqual(201);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.name).toBe(productThree.name);

    // record the product for the delete test
    productToDelete = response.body.data;
  });

  test('It should update a product', async () => {
    const productUpdate = {
      name: 'New Product',
      description:
        "What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book it has?"
    };
    const response = await request(app)
      .put(`/api/v1/products/${productToDelete._id}`)
      .send(productUpdate);

    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.name).toBe(productUpdate.name);

    // record the new product for the delete test
    productToDelete = response.body.data;
  });

  test('It should delete the last product', async () => {
    const response = await request(app).delete(
      `/api/v1/products/${productToDelete._id}`
    );

    expect(response.statusCode).toEqual(200);
    expect(response.body.success).toEqual(true);
    expect(response.body.data.length).toBe(0);
  });
});
