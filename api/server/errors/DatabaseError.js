const CustomError = require('./customError');

class DatabaseError extends CustomError {
  constructor() {
    super();
    this.message = 'Database connection error';
    this.statusCode = 500;
  }

  serializeError() {
    return [
      {
        message: this.message
      }
    ];
  }
}
module.exports = DatabaseError;
