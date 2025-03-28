const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const { beforeAll, afterAll, afterEach } = require('@jest/globals');

let mongod;

// Connect to the in-memory database before running tests
beforeAll(async () => {
    // Close any existing connections
    await mongoose.disconnect();
    
    // Create new in-memory database
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
});

// Clear all data after each test
afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
});

// Close database connection after all tests
afterAll(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
    if (mongod) {
        await mongod.stop();
    }
}); 