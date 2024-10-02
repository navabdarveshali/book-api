// tests/userController.test.js

const request = require('supertest');
const app = require('../app'); // Import your Express app
const userModel = require('../models/userModel');

jest.mock('../models/userModel');
jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('testToken'),
}));

describe('User Controller', () => {
  it('should register a new user', async () => {
    userModel.addUser.mockResolvedValue(1);

    const response = await request(app)
      .post('/users/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123',
        contact: '123456789'
      });
    
    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User registered successfully.');
  });

  it('should log in an existing user', async () => {
    const mockUser = { id: 1, email: 'john@example.com', password: 'hashedPassword' };
    userModel.getUserByEmail.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'john@example.com',
        password: 'Password123'
      });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBe('testToken');
  });

  it('should return 404 if user not found', async () => {
    userModel.getUserByEmail.mockResolvedValue(null);

    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'Password123'
      });
    
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found.');
  });

  it('should update user details', async () => {
    userModel.updateUser.mockResolvedValue(1);

    const response = await request(app)
      .put('/users/update')
      .send({
        name: 'John Updated',
        email: 'johnupdated@example.com',
        contact: '987654321'
      })
      .set('Authorization', 'Bearer testToken'); // Mock token
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('User updated successfully.');
  });
});
