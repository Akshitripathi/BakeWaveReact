const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as per your project structure

const authMiddleware = (requiredRoles = []) => async (req, res, next) => {
  try {
    console.log('Auth Middleware: Start');

    const token = req.cookies.authToken;
    if (!token) {
      console.log('AuthToken cookie missing');
      return res.status(401).json({ message: 'Access token is required' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded JWT:', decoded);

    // Fetch the user from the database
    const user = await User.findById(decoded.id).select('-password'); // Exclude the password field
    if (!user) {
      console.log('User not found for decoded ID:', decoded.id);
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user's role matches one of the required roles
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
      console.log(`Access denied. Role mismatch: Required - ${requiredRoles}, User - ${user.role}`);
      return res.status(403).json({ message: 'Access denied' });
    }

    // Attach the user to the request object
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
