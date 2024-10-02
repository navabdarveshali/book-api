const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    // Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(String(password));
};

const validateContact = (contact) => {
    const re = /^[0-9]{10}$/; // Assuming contact is a 10-digit number
    return re.test(String(contact));
};

module.exports = {
    validateEmail,
    validatePassword,
    validateContact
};
