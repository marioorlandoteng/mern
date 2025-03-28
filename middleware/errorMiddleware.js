const AppError = require('../errors/AppError');
const NotFoundError = require('../errors/NotFoundError');

const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error('Error:', err);

    // Handle custom application errors
    if (err instanceof AppError) {
        return res.status(err.status).json({
            status: 'error',
            message: err.message
        });
    }

    if (err.name === 'NotFoundError') {
        return res.status(404).json({
            status: 'error',
            message: 'Not Found Error',
            details: Object.values(err.errors).map(e => e.message)
        });
    }

    // MongoDB validation error
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: 'Validation Error',
            details: Object.values(err.errors).map(e => e.message)
        });
    }

    // MongoDB duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            status: 'error',
            message: 'Duplicate Error',
            details: `${Object.keys(err.keyValue)} already exists`
        });
    }

    // MongoDB cast error (invalid ID)
    if (err.name === 'CastError') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid ID format'
        });
    }

    // Default error
    res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { 
            actualError: err.message,
            stack: err.stack 
        })
    });
};

module.exports = errorHandler; 