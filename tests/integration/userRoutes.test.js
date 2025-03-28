const request = require('supertest');
const app = require('../../index');
const User = require('../../models/User');

describe('User Routes', () => {
    const testUser = {
        name: 'Test User',
        email: 'test@example.com'
    };

    // Test GET /user
    describe('GET /user', () => {
        it('should return all users', async () => {
            await User.create(testUser);
            
            const res = await request(app)
                .get('/user')
                .expect(200);
            
            expect(Array.isArray(res.body)).toBeTruthy();
            expect(res.body.length).toBe(1);
            expect(res.body[0].email).toBe(testUser.email);
        });
    });

    // Test POST /user
    describe('POST /user', () => {
        it('should create a new user', async () => {
            const res = await request(app)
                .post('/user')
                .send(testUser)
                .expect(201);
            
            expect(res.body.name).toBe(testUser.name);
            expect(res.body.email).toBe(testUser.email);
        });

        it('should fail to create user with duplicate email', async () => {
            // First create a user
            await User.create(testUser);
            
            // Try to create another user with same email
            const res = await request(app)
                .post('/user')
                .send(testUser)
                .expect(400);
            
            expect(res.body.status).toBe('error');
        });
    });

    // Test GET /user/:id
    describe('GET /user/:id', () => {
        it('should return user by id', async () => {
            const user = await User.create(testUser);
            
            const res = await request(app)
                .get(`/user/${user._id}`)
                .expect(200);
            
            expect(res.body.email).toBe(testUser.email);
        });

        it('should return 404 for non-existent user', async () => {
            const fakeId = '507f1f77bcf86cd799439011';
            
            await request(app)
                .get(`/user/${fakeId}`)
                .expect(404);
        });
    });
}); 