// errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging

    res.status(err.status || 500); // Set the response status code
    res.json({
        success: false,
        message: err.message || 'Internal Server Error', // Send a response with the error message
    });
};

module.exports = errorHandler;
