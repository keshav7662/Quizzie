const handleErrorResponse = (res, statusCode, errorMessage) => {
    return res.status(statusCode).json({ error: errorMessage });
};
module.exports = { handleErrorResponse }