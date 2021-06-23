/* eslint-disable no-console */
const mongoose = require('mongoose');

const { url, options } = require('./config');

mongoose.connect(url, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("we're connected!"));

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(url, options);
  },
  disconnect: (done) => {
    mongoose.disconnect(done);
  },
  dropDatabase: () => {
    db.dropDatabase();
  }
};
