const connection = require('../config/db');

// borrows table
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


createBorrowsTable();





module.exports = {
    // borrow book
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

 // return book
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

                if (results.length === 0) {
                    return resolve(0); 
                }

                const dueDate = new Date(results[0].due_date);
                const currentDate = new Date();

                const lateFeePerDay = 1.00;
                let lateFee = 0;

                if (currentDate > dueDate) {
                    const timeDiff = currentDate - dueDate; 
                    const daysLate = Math.ceil(timeDiff / (1000 * 3600 * 24));
                    lateFee = daysLate * lateFeePerDay; 
                }

                connection.query(updateReturnSql, [lateFee, id], (updateErr, updateResults) => {
                    if (updateErr) {
                        return reject(updateErr);
                    }
                    resolve(updateResults.affectedRows);
                });
            });
        } catch (error) {
            reject(error);
        }
    });
},


    // to get all borrow books
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

    //get overdue books
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
