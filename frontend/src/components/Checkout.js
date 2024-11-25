import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart
import '../css/style.css';

const Checkout = () => {
    const { cartItems, setCartItems } = useCart(); // Access cartItems and setCartItems from CartContext
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(1);
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const orderDetails = {
            items: cartItems,
            total: calculateTotal(),
        };

        // Save order to localStorage for profile page display
        const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, orderDetails]));

        setCartItems([]); // Clear the cart
        localStorage.removeItem('cartItems'); // Remove cart items from localStorage
        navigate('/order-confirmation', { state: { orderDetails } }); // Navigate with order details
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout">
                <h1>Your cart is empty!</h1>
                <button onClick={() => navigate('/food-menu')} className="submit-btn">
                    Go to Menu
                </button>
            </div>
        );
    }

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <div className="checkout-items">
                {cartItems.map((item, index) => (
                    <div key={index} className="checkout-item">
                        <img
                            src={`http://localhost:4000/${item.image}`}
                            alt={item.name}
                            className="cart-item-image"
                        />
                        <div className="checkout-item-details">
                            <p className="item-name">{item.name}</p>
                            <p>Price: ₹{item.price.toFixed(1)}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Total: ₹{(item.price * item.quantity).toFixed(1)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="checkout-total">
                <h2>Total Amount: ₹{calculateTotal()}</h2>
            </div>
            <form onSubmit={handlePlaceOrder} className="checkout-form">
                <h3>Billing Details</h3>
                <input type="text" placeholder="Name" required />
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="Address" required />
                <button type="submit" className="submit-btn">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
