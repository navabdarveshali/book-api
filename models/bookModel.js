const connection = require('../config/db');

// books table
const createBooksTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS books (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(100) NOT NULL,
            genre VARCHAR(100),
            availability_status ENUM('available', 'unavailable') DEFAULT 'available',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating books table:', err);
        } else {
            console.log('Books table created or already exists.');
        }
    });
};


createBooksTable();

module.exports = {
    // adding book
    addBook: (title, author, genre) => {
        const sql = 'INSERT INTO books (title, author, genre) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(sql, [title, author, genre], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    },

    // fecthing by genre field
    getBooksByGenre: (genre , author,availability) => {
        const sql = 'SELECT * FROM books WHERE genre = ?';

        return new Promise((resolve, reject) => {
            connection.query(sql, [genre,author,availability], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    

    // update book
    updateBook: (id, title, author, genre, availability_status) => {
        const sql = 'UPDATE books SET title = ?, author = ?, genre = ?, availability_status = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [title, author, genre, availability_status, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });
    },

    // delete book
    deleteBook: (id) => {
        const sql = 'DELETE FROM books WHERE id = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });
    }
};
