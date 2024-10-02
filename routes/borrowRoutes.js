const express = require('express');
const { borrowBook, returnBook, getUserBorrowedBooks, getOverdueBooks } = require('../controllers/borrowController');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

// Borrow a book
router.post('/borrow', authMiddleware, borrowBook);

// Return a book
router.post('/return', authMiddleware, returnBook);

// Get all books borrowed by a user
router.get('/user/:userId', authMiddleware, getUserBorrowedBooks);

// get all due books
router.get('/getdues',getOverdueBooks);


module.exports = router;
