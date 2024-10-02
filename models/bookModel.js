const connection = require('../config/db'); // Import the database connection

// Create the Books table if it doesn't exist
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

// Call the function to create the Books table
createBooksTable();

module.exports = {
    // Function to add a new book
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

    // Function to get all books by genre
    getBooksByGenre: (genre) => {
        const sql = 'SELECT * FROM books WHERE genre = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [genre], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    // Function to update book details
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

    // Function to remove a book
    removeBook: (id) => {
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
