// const borrowService = require('../services/borrowService');
// const borrowModel = require('../models/borrowModel');
// const bookModel = require('../models/bookModel');
// const { addDays } = require('../utils/dateHelper');

// // Mock the models
// jest.mock('../models/borrowModel');
// jest.mock('../models/bookModel');
// jest.mock('../utils/dateHelper');

// describe('Borrow Service Tests', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('borrowBook - should borrow a book successfully', async () => {
//         const userId = 1;
//         const bookId = 1;
//         const mockBook = { id: bookId, title: 'Book One', author: 'Author One', available: true };

//         bookModel.findBookById.mockResolvedValue(mockBook);
//         bookModel.updateBookAvailability.mockResolvedValue();
//         addDays.mockReturnValue(new Date('2024-10-16')); // Mock the due date

//         const result = await borrowService.borrowBook(userId, bookId);

//         expect(result).toEqual({ message: 'Book borrowed successfully.', dueDate: new Date('2024-10-16') });
//         expect(borrowModel.borrowBook).toHaveBeenCalledWith(userId, bookId, new Date('2024-10-16'));
//         expect(bookModel.updateBookAvailability).toHaveBeenCalledWith(bookId, false);
//     });

//     test('borrowBook - should throw error if book is not available', async () => {
//         const userId = 1;
//         const bookId = 1;
//         const mockBook = { id: bookId, title: 'Book One', author: 'Author One', available: false };

//         bookModel.findBookById.mockResolvedValue(mockBook);

//         await expect(borrowService.borrowBook(userId, bookId)).rejects.toThrow('Book is not available for borrowing.');
//     });

//     test('returnBook - should return a borrowed book successfully', async () => {
//         const userId = 1;
//         const bookId = 1;

//         borrowModel.findBorrowRecord.mockResolvedValue({ userId, bookId });
//         bookModel.updateBookAvailability.mockResolvedValue();

//         const result = await borrowService.returnBook(userId, bookId);

//         expect(result).toEqual({ message: 'Book returned successfully.' });
//         expect(borrowModel.returnBook).toHaveBeenCalledWith(userId, bookId);
//         expect(bookModel.updateBookAvailability).toHaveBeenCalledWith(bookId, true);
//     });

//     test('returnBook - should throw error if no record found', async () => {
//         const userId = 1;
//         const bookId = 1;

//         borrowModel.findBorrowRecord.mockResolvedValue(null);

//         await expect(borrowService.returnBook(userId, bookId)).rejects.toThrow('No record of this book being borrowed by this user.');
//     });

//     test('getBorrowedBooksByUser - should return borrowed books', async () => {
//         const userId = 1;
//         const mockBorrowedBooks = [{ bookId: 1, title: 'Book One' }];

//         borrowModel.getBorrowedBooksByUser.mockResolvedValue(mockBorrowedBooks);

//         const result = await borrowService.getBorrowedBooksByUser(userId);

//         expect(result).toEqual(mockBorrowedBooks);
//     });

//     test('getBorrowedBooksByUser - should throw error if no books found', async () => {
//         const userId = 1;

//         borrowModel.getBorrowedBooksByUser.mockResolvedValue([]);

//         await expect(borrowService.getBorrowedBooksByUser(userId)).rejects.toThrow('No books borrowed by this user.');
//     });
// });
