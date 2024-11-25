const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderControllers');
const authMiddleware = require('../middleware/authMiddleware');

// POST route to create an order
router.post('/orders', authMiddleware(), orderController.createOrder);
router.get('/orders', authMiddleware(), orderController.getOrders);

module.exports = router;
