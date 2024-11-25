import React from 'react';
import { useCart } from '../context/CartContext';

export default function Cart() {
    const { cartItems, removeItemFromCart } = useCart();

    const handleRemove = (id) => {
        removeItemFromCart(id);
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <span>{item.name}</span>
                            <span>₹{item.price}</span>
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
