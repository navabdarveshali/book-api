const connection = require('../config/db'); // Import the database connection

// Create the Borrows table if it doesn't exist
const createBorrowsTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS borrows (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            book_id INT NOT NULL,
            email VARCHAR(255) NOT NULL,
            late_fee DECIMAL(10, 2) DEFAULT 0.00,
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


const calculateLateFee = (dueDate) => {
    const currentDate = new Date();
    const daysOverdue = Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    const lateFeePerDay = 1.00; // Example: $1 per day
    const maxLateFee = 10.00; // Example: Maximum late fee cap

    if (daysOverdue > 0) {
        return Math.min(daysOverdue * lateFeePerDay, maxLateFee); // Calculate fee and apply max cap
    }
    return 0; // No late fee if not overdue
};


module.exports = {
    // Function to borrow a book
    borrowBook: (user_id, book_id, email,due_date) => {
        const sql = 'INSERT INTO borrows (user_id, book_id, email,due_date) VALUES (?, ?, ?,?)';
        return new Promise((resolve, reject) => {
            connection.query(sql, [user_id, book_id, email,due_date], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    },

 // Function to return a borrowed book
returnBook: async (id) => {
    const getBorrowDetailsSql = 'SELECT due_date FROM borrows WHERE id = ?';
    const updateReturnSql = 'UPDATE borrows SET return_date = NOW(), late_fee = ? WHERE id = ?';

    return new Promise(async (resolve, reject) => {
        try {
            // Fetch the due date to calculate the late fee
            connection.query(getBorrowDetailsSql, [id], async (err, results) => {
                if (err) {
                    return reject(err);
                }

                // Check if the borrow record exists
                if (results.length === 0) {
                    return resolve(0); // No record found
                }

                const dueDate = new Date(results[0].due_date);
                const currentDate = new Date();

                // Calculate late fee if applicable (e.g., $1 per day late)
                const lateFeePerDay = 1.00; // Set your late fee rate
                let lateFee = 0;

                // Check if the book is returned after the due date
                if (currentDate > dueDate) {
                    const timeDiff = currentDate - dueDate; // Time difference in milliseconds
                    const daysLate = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
                    lateFee = daysLate * lateFeePerDay; // Calculate total late fee
                }

                // Update the borrow record with return date and late fee
                connection.query(updateReturnSql, [lateFee, id], (updateErr, updateResults) => {
                    if (updateErr) {
                        return reject(updateErr);
                    }
                    resolve(updateResults.affectedRows); // Return number of affected rows
                });
            });
        } catch (error) {
            reject(error);
        }
    });
},


    // Function to get all borrowed books by a user
    getUserBorrowedBooks: (user_id) => {
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
        const sql = 'SELECT * FROM borrows WHERE due_date > NOW() AND return_date IS NULL';
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
