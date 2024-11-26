import React from 'react';
import { useCart } from '../context/CartContext';
import '../css/Cart.css';
export default function Cart() {
    const { cartItems, updateItemQuantity } = useCart();

    const handleIncreaseQuantity = (id, currentQuantity) => {
        updateItemQuantity(id, currentQuantity + 1);
    };

    const handleDecreaseQuantity = (id, currentQuantity) => {
        if (currentQuantity > 1) {
            updateItemQuantity(id, currentQuantity - 1);
        }
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="cart-list">
                    {cartItems.map((item) => (
                        <li key={item._id} className="cart-item">
                            <div className="item-details">
                                <span className="item-name">{item.name}</span>
                                <span className="item-price">₹{item.price}</span>
                            </div>
                            <div className="quantity-controls">
                                <button
                                    onClick={() => handleDecreaseQuantity(item._id, item.quantity)}
                                    className="quantity-btn"
                                >
                                    -
                                </button>
                                <span className="quantity">{item.quantity}</span>
                                <button
                                    onClick={() => handleIncreaseQuantity(item._id, item.quantity)}
                                    className="quantity-btn"
                                >
                                    +
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
