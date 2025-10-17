const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = generateToken;