const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization'); // add the token as name Authorization in postman

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided. Authorization denied.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Token is not valid.' });
    }
};

module.exports = authMiddleware;
