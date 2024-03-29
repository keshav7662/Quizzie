const jwt = require('jsonwebtoken')
const { handleErrorResponse } = require('../utils/handleErrorResponse')

const authenticatedUser = async (req, res, next) => {
    try {
        const Authorization = req.headers['authorization']
        const user = jwt.verify(Authorization, process.env.JWT_KEY);
        req.user = user;
        next();
    } catch (error) {
        return handleErrorResponse(res, 500, 'Invalid user, login again!')
    }
}
module.exports = authenticatedUser;