const connection = require('../config/db');
const { sendEmail } = require('../utils/emailService');


const getUsersWithUpcomingReturns = async () => {
    try {
    const daysBeforeReturn = 2; // before 2 days
    const currentDate = new Date();
    const reminderDate = new Date(currentDate);
    reminderDate.setDate(currentDate.getDate() + daysBeforeReturn);

    const sql = 'SELECT email, book_id, return_date FROM borrows WHERE due_date >= ?';
    return new Promise((resolve, reject) => {
        connection.query(sql, [reminderDate], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
    } catch (error) {
        console.log("error while sending mail",error);
        
    }
    
};

// Function to send reminder mails
const sendDueReminders = async () => {
    try {
        const users = await getUsersWithUpcomingReturns();
        
        for (const user of users) {
            const { email, book_id, due_date } = user;

            const subject = 'Reminder: Book Return Due Soon';
            const text = `Dear User, your borrowed book (ID: ${book_id}) is due for return on ${due_date}. Please return it on time. Thank you!`;

            await sendEmail(email, subject, text);
        }
    } catch (err) {
        console.error('Error sending return reminders:', err);
    }
};

module.exports = {
    sendDueReminders
};
