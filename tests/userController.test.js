// const request = require('supertest');
// const express = require('express');
// const userRoutes = require('../routes/userRoutes');
// const userModel = require('../models/userModel');

// const app = express();
// app.use(express.json());
// app.use('/api/users', userRoutes);

// // Mock the userModel functions
// jest.mock('../models/userModel');

// describe('User Controller Tests', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('POST /register - should register a new user', async () => {
//         userModel.addUser.mockResolvedValue(1); // Mock return user ID

//         const response = await request(app)
//             .post('/api/users/register')
//             .send({
//                 name: 'John Doe',
//                 email: 'john@example.com',
//                 password: 'Password123',
//                 contact: '1234567890'
//             });

//         expect(response.status).toBe(201);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe('User registered successfully.');
//     });

//     test('POST /login - should log in a user', async () => {
//         userModel.findUserByEmail.mockResolvedValue({ id: 1, email: 'john@example.com', password: 'hashedPassword' });
//         jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true); // Mock password comparison

//         const response = await request(app)
//             .post('/api/users/login')
//             .send({
//                 email: 'john@example.com',
//                 password: 'Password123'
//             });

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe('Logged in successfully.');
//     });

//     test('PUT /update - should update user information', async () => {
//         const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', contact: '1234567890' };
//         userModel.findUserById.mockResolvedValue(mockUser);
//         userModel.updateUser.mockResolvedValue(mockUser);

//         const response = await request(app)
//             .put('/api/users/update')
//             .send({
//                 name: 'Jane Doe',
//                 email: 'jane@example.com',
//                 contact: '0987654321'
//             })
//             .set('Authorization', 'Bearer someValidToken'); // Mock the authorization header

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe('User updated successfully.');
//     });
// });
