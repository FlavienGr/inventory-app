const CustomError = require('./customError');

class DataNotAllowedError extends CustomError {
  constructor() {
    super();
    this.message = 'Data not allowed';
    this.statusCode = 400;
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
