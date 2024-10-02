const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const borrowRoutes = require('./routes/borrowRoutes.js');
const errorHandler = require('./middlewares/errorHandler');
const connection = require('./config/db.js'); // Import the database connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Using Express's built-in JSON parser
app.use(cors());

// Database Connection
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if the connection fails
    } else {
        console.log('Connected to the MySQL database.');
    }
});

// Routes
app.use('/api/users', userRoutes); // Enable user routes
app.use('/api/books', bookRoutes); // Enable book routes
app.use('/api/borrow', borrowRoutes); // Enable borrow routes

// Error Handler
app.use(errorHandler);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
