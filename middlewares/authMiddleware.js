const jwt = require('jsonwebtoken');

// Middleware to authenticate using JWT
const authMiddleware = (req, res, next) => {
    // Get the token from the header
    const header = req.header('Authorization');

    // If there is no token, return an error
    if (!header) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    const token = header.replace('Bearer ', '');

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // Add the user from the token to the request object
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ msg: 'Access denied, only for admins' });
    }
};

module.exports = {authMiddleware, adminMiddleware};