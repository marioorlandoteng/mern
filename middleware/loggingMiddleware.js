const loggingMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;

    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

    // Add response time logging
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;
        console.log(`[${timestamp}] ${method} ${url} - Status: ${status} - Duration: ${duration}ms`);
    });

    next();
};

module.exports = loggingMiddleware; 