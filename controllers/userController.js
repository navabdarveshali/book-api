const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel.js');
const { validateEmail, validatePassword, validateContact } = require('../utils/validation');
require('dotenv').config();

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password, contact } = req.body;

    if (!name || !email || !password || !contact) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    if (!validatePassword(password)) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.' });
    }

    if (!validateContact(contact)) {
        return res.status(400).json({ success: false, message: 'Invalid contact number.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const userId = await userModel.addUser(name, email, hashedPassword, contact);
        res.status(201).json({ success: true, message: 'User registered successfully.', userId });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error registering user.', error: err.message });
    }
};

// Log in a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    try {
        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, 'navabdarveshali', {
            expiresIn: '1h'
        });

        res.json({ success: true, message: 'Logged in successfully.', token });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error logging in user.', error: err.message });
    }
};

// Update user account information
const updateUser = async (req, res) => {
    const { name, email, contact } = req.body;
    const userId = req.user.id; // Assuming the user ID is retrieved from the token

    if (!name || !email || !contact) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    if (!validateContact(contact)) {
        return res.status(400).json({ success: false, message: 'Invalid contact number.' });
    }

    try {
        const updatedUser = await userModel.updateUser(userId, name, email, contact);
        res.json({ success: true, message: 'User updated successfully.', updatedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating user.', error: err.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser
};
