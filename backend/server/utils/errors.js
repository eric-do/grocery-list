class ServerError extends Error {
  constructor(error) {
    super(error);
    this.data = error;
  }
}

class BadRequestError extends ServerError {
  constructor(error) {
    super(error.message);
    this.statusCode = 400;
    this.name="Bad request error";
    this.message = "Request was invalid. Please try again.";
  }
}

class InternalServerError extends ServerError {
  constructor(error) {
    super(error.message);
    this.statusCode = 500;
    this.name="Internal server error";
    this.message = "Something went wrong. Please try again.";
  }
}

module.exports = {
  BadRequestError,
  InternalServerError
}