const ApiError = require("../utils/ApiError")

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

  //unexpected errors
  res.status(500).json({
    success: false,
    message: 'Something went wrong',
  });
};

module.exports = errorHandler;