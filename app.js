const express = require('express');
const cors = require('cors');
const { sendDueReminders } = require('./services/reminderService.js');
const userRoutes = require('./routes/userRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const borrowRoutes = require('./routes/borrowRoutes.js');
const errorHandler = require('./middlewares/errorHandler');
const connection = require('./config/db.js'); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))            
// app.use(cookieParser())

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
app.use('/api/users', userRoutes); 
app.use('/api/books', bookRoutes); 
app.use('/api/borrows', borrowRoutes);

// Error Handler
app.use(errorHandler);

// mail remainder
const triggerSendReturnReminders = async () => {
    try {
        await sendDueReminders();
        console.log('Return reminders have been sent successfully!');
    } catch (err) {
        console.error('Error while sending return reminders:', err);
    }
};
triggerSendReturnReminders();


// server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
