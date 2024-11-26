const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const { items, totalAmount } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Items are required' });
        }
        for (const item of items) {
            if (!item.productId || !item.name || !item.price || !item.quantity || !item.image) {
                return res.status(400).json({
                    message: 'Each item must include productId, name, price, quantity, and image.',
                });
            }
        }

        if (!totalAmount || typeof totalAmount !== 'number') {
            return res.status(400).json({ message: 'Valid total amount is required' });
        }

        const order = new Order({
            userId: req.user.id, 
            items,
            totalAmount,
        });

        const savedOrder = await order.save();

        res.status(201).json({
            message: 'Order created successfully',
            order: savedOrder,
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


exports.getOrders = async (req, res) => {
    const userId = req.user.id; 

    try {
        const orders = await Order.find({ userId }); 
        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message,
        });
    }
};
