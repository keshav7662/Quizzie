  const bcrypt = require('bcrypt');
  const User = require('../models/User');
  const ApiError = require('../utils/ApiError');
  const generateToken = require('../utils/generateToken');

  const createUser = async (req, res, next) => {
    try {
      const { fullName, email, password, confirmPassword } = req.body;

      if (!fullName || !email || !password || !confirmPassword) {
        throw new ApiError(400, 'All fields are required!');
      }
      if (password !== confirmPassword) {
        throw new ApiError(400, 'Passwords do not match!');
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new ApiError(409, 'Email is already registered!');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        fullName: fullName.trim(),
        email: email.trim(),
        password: hashedPassword,
      });

      const token = generateToken({ _id: newUser._id, email: newUser.email });

      return res.status(201).json({
        success: true,
        message: 'Registration successful!',
        token,
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApiError(400, 'Email and password are required!');
      }

      const user = await User.findOne({ email });
      if (!user) {
        throw new ApiError(401, 'Invalid credentials! Please register.');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid password!');
      }

      const token = generateToken({ _id: user._id, email: user.email });

      return res.status(200).json({
        success: true,
        message: 'Login successful!',
        token,
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  module.exports = { createUser, loginUser };
