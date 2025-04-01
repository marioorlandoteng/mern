const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
require('dotenv').config();

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1/user'
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // For parsing application/json
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded
app.use(loggingMiddleware);  // Add logging middleware

// Database connection (only if not in test environment)
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(MONGO_URI, {})
        .then(() => console.log("MongoDB is connected"))
        .catch(err => console.log(err));
}

// Routes
app.use('/user', userRoute);

// Error handling middleware (must be last!)
app.use(errorHandler);

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;