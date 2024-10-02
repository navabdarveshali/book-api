const borrowModel = require('../models/borrowModel');
const bookModel = require('../models/bookModel');
const { addDays } = require('../utils/dateHelper');

// Service to borrow a book
const borrowBook = async (userId, bookId) => {
    const book = await bookModel.findBookById(bookId);
    if (!book) {
        throw new Error('Book not found.');
    }

    if (!book.available) {
        throw new Error('Book is not available for borrowing.');
    }

    const dueDate = addDays(new Date(), 14); // Set due date to 14 days from now
    await borrowModel.borrowBook(userId, bookId, dueDate);
    await bookModel.updateBookAvailability(bookId, false); // Mark book as unavailable

    return { message: 'Book borrowed successfully.', dueDate };
};

// Service to return a borrowed book
const returnBook = async (userId, bookId) => {
    const borrowRecord = await borrowModel.findBorrowRecord(userId, bookId);
    if (!borrowRecord) {
        throw new Error('No record of this book being borrowed by this user.');
    }

    await borrowModel.returnBook(userId, bookId);
    await bookModel.updateBookAvailability(bookId, true); // Mark book as available

    return { message: 'Book returned successfully.' };
};

// Service to fetch all books borrowed by a specific user
const getBorrowedBooksByUser = async (userId) => {
    const borrowedBooks = await borrowModel.getBorrowedBooksByUser(userId);
    if (borrowedBooks.length === 0) {
        throw new Error('No books borrowed by this user.');
    }
    return borrowedBooks;
};

module.exports = {
    borrowBook,
    returnBook,
    getBorrowedBooksByUser,
};
