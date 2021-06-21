/* eslint-disable consistent-return */
const CustomError = require('../errors/customError');

// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .send({ success: false, errors: err.serializeMessage() });
  }
  res
    .status(500)
    .send({ success: false, errors: [{ message: 'Error server' }] });
};
