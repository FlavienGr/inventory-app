class CustomError extends Error {
  constructor(error) {
    super();
    this.error = error;
  }

  serializeMessage() {
    return [
      {
        message: this.errors
      }
    ];
  }
}

module.exports = CustomError;
