const { createResponse } = require('../utils/responseHelper'); // Uncomment this line
const borrowModel = require('../models/borrowModel');
const {validateEmail} = require('../utils/validation');
// Borrow a book
const borrowBook = async (req, res) => {
    try {
        const { user_id, book_id , email} = req.body;
        if (!email || !user_id || !book_id) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }
    
        if (!validateEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // Set due date to 14 days from now

        const result = await borrowModel.borrowBook(user_id, book_id,email, dueDate);
        // console.log(dueDate);
        
        return createResponse(res, 200, 'Book borrowed successfully', result);
    } catch (error) {
        return createResponse(res, 500, 'Failed to borrow book', error.message);
    }
};

// Return a book
const returnBook = async (req, res) => {
    try {
        const { id} = req.body;
        const result = await borrowModel.returnBook(id);
        return createResponse(res, 200, 'Book returned successfully', result);
    } catch (error) {
        return createResponse(res, 500, 'Failed to return book', error.message);
    }
};

// Get all books borrowed by a user
const getUserBorrowedBooks = async (req, res) => {
    try {
        const user_id = req.params.userId;
        const borrowedBooks = await borrowModel.getUserBorrowedBooks(user_id);
        return createResponse(res, 200, 'Borrowed books retrieved successfully', borrowedBooks);
    } catch (error) {
        return createResponse(res, 500, 'Failed to retrieve borrowed books', error.message);
    }
};

const getOverdueBooks = async (req, res) => {
    try {
        
        const getOverdueBooks = await borrowModel.getOverdueBooks();
        return createResponse(res, 200, 'Borrowed books retrieved successfully', getOverdueBooks);
    } catch (error) {
        return createResponse(res, 500, 'Failed to retrieve borrowed books', error.message);
    }
};

module.exports = {
    borrowBook,
    returnBook,
    getUserBorrowedBooks,
    getOverdueBooks
};
