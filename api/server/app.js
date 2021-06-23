const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');

// set the environment variables for development or test environment
if (process.env.NODE_ENV === 'development') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.development`)
  });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: path.join(`${process.cwd()}/config/.env.test`)
  });
}

// setup an express instance
const app = express();

// handling cors request
app.use(
  cors({
    origin: '*'
  })
);

// parses incoming requests with JSON payloads
app.use(express.json());
// / Logs
app.use(morgan('combined'));

// / product router

const routerProduct = require('./routes/product'); //  routes
const routerInventory = require('./routes/inventory'); //  routes

app.use('/api/v1/products', routerProduct);
app.use('/api/v1/inventory', routerInventory);

// / error handler
app.use(errorHandler);

module.exports = app;
