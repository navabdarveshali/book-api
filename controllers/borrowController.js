const borrowService = require('../services/borrowService');
// const { createResponse } = require('../utils/responseHelper'); // Uncomment this line

// Borrow a book
const borrowBook = async (req, res) => {
    try {
        const { user_id, book_id } = req.body;
        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14); // Set due date to 14 days from now

        const result = await borrowService.borrowBook(user_id, book_id, dueDate);
        return createResponse(res, 200, 'Book borrowed successfully', result);
    } catch (error) {
        return createResponse(res, 500, 'Failed to borrow book', error.message);
    }
};

// Return a book
const returnBook = async (req, res) => {
    try {
        const { user_id, book_id } = req.body;
        const result = await borrowService.returnBook(user_id, book_id);
        return createResponse(res, 200, 'Book returned successfully', result);
    } catch (error) {
        return createResponse(res, 500, 'Failed to return book', error.message);
    }
};

// Get all books borrowed by a user
const getUserBorrowedBooks = async (req, res) => {
    try {
        const userId = req.params.userId;
        const borrowedBooks = await borrowService.getUserBorrowedBooks(userId);
        return createResponse(res, 200, 'Borrowed books retrieved successfully', borrowedBooks);
    } catch (error) {
        return createResponse(res, 500, 'Failed to retrieve borrowed books', error.message);
    }
};

module.exports = {
    borrowBook,
    returnBook,
    getUserBorrowedBooks
};
