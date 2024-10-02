// const request = require('supertest');
// const express = require('express');
// const bookRoutes = require('../routes/bookRoutes');
// const bookModel = require('../models/bookModel');

// const app = express();
// app.use(express.json());
// app.use('/api/books', bookRoutes);

// // Mock the bookModel functions
// jest.mock('../models/bookModel');

// describe('Book Controller Tests', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });

//     test('GET /genre/:genre - should fetch books by genre', async () => {
//         const mockBooks = [{ id: 1, title: 'Book One', author: 'Author One', genre: 'Fiction' }];
//         bookModel.getBooksByGenre.mockResolvedValue(mockBooks);

//         const response = await request(app).get('/api/books/genre/Fiction');

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.books).toEqual(mockBooks);
//     });

//     test('POST /add - should add a new book', async () => {
//         bookModel.addBook.mockResolvedValue(1); // Mock return book ID

//         const response = await request(app)
//             .post('/api/books/add')
//             .send({
//                 title: 'New Book',
//                 author: 'New Author',
//                 genre: 'Non-Fiction',
//                 available: true,
//             })
//             .set('Authorization', 'Bearer someValidToken'); // Mock the authorization header

//         expect(response.status).toBe(201);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe('Book added successfully.');
//     });

//     test('PUT /update/:id - should update book details', async () => {
//         const mockBook = { id: 1, title: 'Updated Book', author: 'Updated Author', genre: 'Fiction', available: true };
//         bookModel.findBookById.mockResolvedValue(mockBook);
//         bookModel.updateBook.mockResolvedValue(mockBook);

//         const response = await request(app)
//             .put('/api/books/update/1')
//             .send({
//                 title: 'Updated Book',
//                 author: 'Updated Author',
//                 genre: 'Fiction',
//                 available: true,
//             })
//             .set('Authorization', 'Bearer someValidToken'); // Mock the authorization header

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe('Book updated successfully.');
//     });

//     test('DELETE /delete/:id - should delete a book', async () => {
//         bookModel.findBookById.mockResolvedValue({ id: 1 }); // Mock existing book
//         bookModel.deleteBook.mockResolvedValue();

//         const response = await request(app)
//             .delete('/api/books/delete/1')
//             .set('Authorization', 'Bearer someValidToken'); // Mock the authorization header

//         expect(response.status).toBe(200);
//         expect(response.body.success).toBe(true);
//         expect(response.body.message).toBe('Book removed successfully.');
//     });
// });
