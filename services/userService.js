const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
require('dotenv').config();

// Service to register a new user
const registerUser = async (name, email, password, contact) => {
    // Check if the user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
        throw new Error('User already exists.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const userId = await userModel.addUser(name, email, hashedPassword, contact);
    return userId;
};

// Service to login a user
const loginUser = async (email, password) => {
    // Find user by email
    const user = await userModel.findUserByEmail(email);
    if (!user) {
        throw new Error('User not found.');
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials.');
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    return { token, user };
};

// Service to update user information
const updateUser = async (userId, name, email, contact) => {
    // Check if the user exists
    const user = await userModel.findUserById(userId);
    if (!user) {
        throw new Error('User not found.');
    }

    // Update the user information
    const updatedUser = await userModel.updateUser(userId, name, email, contact);
    return updatedUser;
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
};
