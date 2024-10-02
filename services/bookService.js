const bookModel = require('../models/bookModel');

// Service to get all books by genre
const getBooksByGenre = async (genre) => {
    const books = await bookModel.getBooksByGenre(genre);
    if (books.length === 0) {
        throw new Error('No books found in this genre.');
    }
    return books;
};

// Service to add a new book
const addBook = async (title, author, genre, available) => {
    const bookId = await bookModel.addBook(title, author, genre, available);
    return bookId;
};

// Service to update book details
const updateBook = async (bookId, title, author, genre, available) => {
    const existingBook = await bookModel.findBookById(bookId);
    if (!existingBook) {
        throw new Error('Book not found.');
    }

    const updatedBook = await bookModel.updateBook(bookId, title, author, genre, available);
    return updatedBook;
};

// Service to delete a book
const deleteBook = async (bookId) => {
    const existingBook = await bookModel.findBookById(bookId);
    if (!existingBook) {
        throw new Error('Book not found.');
    }

    await bookModel.deleteBook(bookId);
    return { message: 'Book deleted successfully.' };
};

module.exports = {
    getBooksByGenre,
    addBook,
    updateBook,
    deleteBook,
};
