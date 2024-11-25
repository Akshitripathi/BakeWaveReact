import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem('cartItems')) || []
    );

    // Add item to the cart
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
    
            if (existingItem) {
                const updatedCart = prevItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                const updatedCart = [...prevItems, { ...item, quantity: 1 }];
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                return updatedCart;
            }
        });
    };
    
  

    // Remove item from cart
    const removeItemFromCart = (id) => {
        setCartItems((prevItems) => {
            const updatedCart = prevItems.filter((item) => item._id !== id); // Use _id here
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    };
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeItemFromCart , setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
