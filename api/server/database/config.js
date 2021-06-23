const dotenv = require('dotenv');
const path = require('path');

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

const url = process.env.MONGO_URI;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
};
module.exports = { url, options };
