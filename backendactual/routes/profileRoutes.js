const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const authController = require('../controllers/authControllers');
const router = express.Router();
const User= require('../models/User');
const Order= require('../models/order');
router.get('/profile', authMiddleware(), authController.getUserProfile);

router.post('/profile/orders', authMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id; // Extract the user ID
    const { items, totalAmount } = req.body;

    // Create a new order
    const newOrder = await Order.create({
      userId,
      items,
      totalAmount,
    });

    // Update the user's orders array
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.orders.push(newOrder._id); // Push the new order ID
    await user.save(); // Save the updated user document

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
});



router.get('/profile/orders', authMiddleware(), async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user and populate the orders field
    const user = await User.findById(userId).populate({
      path: 'orders',
      populate: { path: 'items.productId', select: 'name price image' },
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ orders: user.orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

  

module.exports = router;
