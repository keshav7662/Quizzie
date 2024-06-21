const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const { handleErrorResponse } = require('../utils/handleErrorResponse');

const createUser = async (req, res) => {
    try {
        const { fullName, email, password, confirmPassword } = req.body;

        if (!fullName && !email && !password && !confirmPassword) {
            return handleErrorResponse(res, 400, 'All fields are required!');
        }
        if (fullName.trim() == '') {
            return handleErrorResponse(res, 400, 'name is required!')
        }
        if (email.trim() == '') {
            return handleErrorResponse(res, 400, 'email is required!')
        }
        if (password.trim() == '') {
            return handleErrorResponse(res, 400, 'password is required!')
        }
        if (confirmPassword.trim() == '') {
            return handleErrorResponse(res, 400, 'confirm password is required!')
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return handleErrorResponse(res, 409, 'Email is already registered!');
        }
        if (password != confirmPassword) {
            return handleErrorResponse(res, 401, 'password do not match!');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, password: encryptedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_KEY);
        return res.status(201).json({
            message: 'Registration successful!',
            token
        });
    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, 500, 'Internal server error!');
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return handleErrorResponse(res, 400, 'Email and Password are required!');
        }

        const validUser = await User.findOne({ email }).select('email password');
        if (!validUser) {
            return handleErrorResponse(res, 401, 'User is not valid, please register again!');
        }

        const validPassword = await bcrypt.compare(password, validUser.password);
        if (!validPassword) {
            return handleErrorResponse(res, 401, 'Password invalid');
        }

        const token = jwt.sign({ userId: validUser._id }, process.env.JWT_KEY);
        validUser.password = undefined;
        return res.status(200).json({
            message: 'Login successful!',
            token,
            validUser
        });

    } catch (error) {
        console.error(error);
        return handleErrorResponse(res, 500, 'Internal server error!');
    }
};

module.exports = { createUser, loginUser };
