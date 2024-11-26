const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const productRoutes = require('./routes/productRoutes');
const profileRoutes = require('./routes/profileRoutes'); 
const authRoutes= require ('./routes/authRoutes');
const db = require('./middleware/db');
const authMiddleware= require('./middleware/authMiddleware');
dotenv.config();

const app = express();

db();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use('/uploads', express.static('uploads'));

// Auth routes
app.use('/api',authRoutes);

// Profile routes
app.use('/api', profileRoutes); 

// Product routes
app.use('/api', productRoutes);

// Order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api', orderRoutes);

const adminRoutes= require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

app.get('/api/test-auth', authMiddleware(), (req, res) => {
  res.status(200).json({ message: 'Authentication successful', user: req.user });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
