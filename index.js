const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const loggingMiddleware = require('./middleware/loggingMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
require('dotenv').config();
const { swaggerUi, specs } = require('./swagger');

const app = express();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1/user'
const PORT = process.env.PORT || 3001;
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css"

// Middleware
app.use(cors());  // Enable CORS for all routes
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: CSS_URL
}));
app.get('/', (req, res) => {
  res.send('Hello from Express + Swagger! 🚀');
});

// Error handling middleware (must be last!)
app.use(errorHandler);

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;