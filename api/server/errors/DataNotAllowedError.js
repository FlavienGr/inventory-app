const CustomError = require('./customError');

class DataNotAllowedError extends CustomError {
  constructor(errMessage, statusCode) {
    super();
    this.message = errMessage || 'Data not allowed';
    this.statusCode = statusCode || 400;
  }

  serializeMessage() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = DataNotAllowedError;
