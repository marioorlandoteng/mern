const mongoose = require('mongoose');
const User = require('../../models/User');
const { describe, it, expect } = require('@jest/globals');

describe('User Model Test', () => {
    // Test user creation
    it('should create & save user successfully', async () => {
        const validUser = new User({
            name: 'John Doe',
            email: 'john@example.com'
        });
        const savedUser = await validUser.save();
        
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(validUser.name);
        expect(savedUser.email).toBe(validUser.email);
        expect(savedUser.createdAt).toBeDefined();
    });

    // Test required fields
    it('should fail to save user without required fields', async () => {
        const userWithoutRequiredField = new User({ name: 'John Doe' });
        let err;
        
        try {
            await userWithoutRequiredField.save();
        } catch (error) {
            err = error;
        }
        
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });
}); 