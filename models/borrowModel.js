const connection = require('../config/db'); // Import the database connection

// Create the Borrows table if it doesn't exist
const createBorrowsTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS borrows (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            book_id INT NOT NULL,
            borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            due_date TIMESTAMP,
            return_date TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
        )
    `;
    
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating borrows table:', err);
        } else {
            console.log('Borrows table created or already exists.');
        }
    });
};

// Call the function to create the Borrows table
createBorrowsTable();

module.exports = {
    // Function to borrow a book
    borrowBook: (user_id, book_id, due_date) => {
        const sql = 'INSERT INTO borrows (user_id, book_id, due_date) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(sql, [user_id, book_id, due_date], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    },

    // Function to return a borrowed book
    returnBook: (id) => {
        const sql = 'UPDATE borrows SET return_date = NOW() WHERE id = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });
    },

    // Function to get all borrowed books by a user
    getBorrowedBooksByUser: (user_id) => {
        const sql = 'SELECT * FROM borrows WHERE user_id = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [user_id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    },

    // Function to get overdue books
    getOverdueBooks: () => {
        const sql = 'SELECT * FROM borrows WHERE due_date < NOW() AND return_date IS NULL';
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results);
            });
        });
    }
};
