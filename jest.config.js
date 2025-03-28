module.exports = {
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./tests/setup.js'],
    testMatch: ['**/*.test.js'],
    verbose: true,
    coveragePathIgnorePatterns: ['/node_modules/']
}; 