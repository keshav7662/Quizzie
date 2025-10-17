const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const authenticatedUser = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) throw new ApiError(401, 'No token provided');

    const token = authHeader.split(' ')[1];
    if (!token) throw new ApiError(401, 'Malformed token');

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Session expired. Please log in again.'));
    }
    if (error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Invalid token. Please log in again.'));
    }
    return next(new ApiError(500, 'Authentication failed.'));
  }
};

module.exports = authenticatedUser;
