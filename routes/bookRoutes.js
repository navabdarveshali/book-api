const express = require('express');
const { getBooksByGenre, addBook, updateBook, deleteBook } = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Get all books by genre
router.get('/genre/:genre', getBooksByGenre);

// Add a new book (requires authentication)
router.post('/add', authMiddleware, addBook);

// Update an existing book (requires authentication)
router.put('/update/:id', authMiddleware, updateBook);

// Remove a book (requires authentication)
router.delete('/delete/:id', authMiddleware, deleteBook);

module.exports = router;
