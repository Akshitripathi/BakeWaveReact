const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as per your project structure

const authMiddleware = (requiredRoles = []) => async (req, res, next) => {
  try {
    console.log('Auth Middleware: Start');

    const token = req.cookies.token;
    if (!token) {
      console.log('Token cookie missing');
      return res.status(401).json({ message: 'Access token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    const user = await User.findById(decoded.id).select('-password'); 
    if (!user) {
      console.log('User not found for decoded ID:', decoded.id);
      return res.status(404).json({ message: 'User not found' });
    }
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      console.log(`Access denied. Role mismatch: Required - ${requiredRoles}, User - ${user.role}`);
      return res.status(403).json({ message: 'Access denied' });
    }

    req.user = { id: user._id, role: user.role };
    console.log('Auth Middleware: User attached to request:', req.user);

    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
