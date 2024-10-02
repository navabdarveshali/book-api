const connection = require('../config/db.js'); // Import the database connection

// Create the Users table if it doesn't exist
const createUsersTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            contact VARCHAR(15),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;
    
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created or already exists.');
        }
    });
};

// Call the function to create the Users table
createUsersTable();

module.exports = {
    // Function to add a new user
    addUser: (name, email, password, contact) => {
        const sql = 'INSERT INTO users (name, email, password, contact) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.query(sql, [name, email, password, contact], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    },

    // Function to get a user by email
    getUserByEmail: (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });
    },

    // Function to update user information
    updateUser: (id, name, email, contact) => {
        const sql = 'UPDATE users SET name = ?, email = ?, contact = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            connection.query(sql, [name, email, contact, id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });
    }

    //to get all users
    
};
