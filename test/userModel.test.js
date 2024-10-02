

const userModel = require('../models/userModel');
const mockDb = require('mysql2/promise'); 

jest.mock('../config/db.js', () => mockDb);

describe('User Model', () => {
  it('should add a user correctly', async () => {
    mockDb.query = jest.fn().mockResolvedValue([{ insertId: 1 }]);
    
    const userId = await userModel.addUser('John Doe', 'john@example.com', 'password', '123456789');
    expect(userId).toBe(1);
  });

  it('should get user by email', async () => {
    const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' };
    mockDb.query = jest.fn().mockResolvedValue([[mockUser]]);
    
    const user = await userModel.getUserByEmail('john@example.com');
    expect(user).toEqual(mockUser);
  });

  it('should update user details', async () => {
    mockDb.query = jest.fn().mockResolvedValue({ affectedRows: 1 });

    const result = await userModel.updateUser(1, 'John Doe', 'john@example.com', '987654321');
    expect(result).toBe(1);
  });
});
