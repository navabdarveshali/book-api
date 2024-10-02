const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // Get the token from the Authorization header

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided. Authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, 'navabdarveshali'); // Verify the token
        req.user = decoded; // Attach the decoded user info to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token is not valid.' });
    }
};

module.exports = authMiddleware;
