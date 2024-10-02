const express = require('express');
const { registerUser, loginUser, updateUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Update user information (requires authentication)
router.put('/update', authMiddleware, updateUser);

module.exports = router;
