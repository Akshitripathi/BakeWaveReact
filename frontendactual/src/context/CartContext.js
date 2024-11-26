import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Cart Context
const CartContext = createContext();

// CartProvider Component
export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load initial cart items from localStorage or default to an empty array
        return JSON.parse(localStorage.getItem('cartItems')) || [];
    });

    // Sync cart items with localStorage whenever the cart changes
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    /**
     * Add an item to the cart.
     * If the item already exists, increment its quantity.
     * Otherwise, add the item to the cart with a quantity of 1.
     */
    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                // Update quantity if item exists
                return prevItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                // Add new item to the cart
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    /**
     * Remove an item from the cart based on its unique `_id`.
     */
    const removeItemFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    };

    /**
     * Update the quantity of a specific item in the cart.
     * @param {string} id - The item's unique ID.
     * @param {number} quantity - The new quantity for the item.
     */
    const updateItemQuantity = (id, quantity) => {
        setCartItems((prevItems) =>
            prevItems.map((cartItem) =>
                cartItem._id === id ? { ...cartItem, quantity: quantity } : cartItem
            )
        );
    };

    /**
     * Clear all items from the cart.
     */
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeItemFromCart,
                updateItemQuantity,
                clearCart,
                setCartItems, // Expose `setCartItems` for direct modifications if needed
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook to use the CartContext
export const useCart = () => useContext(CartContext);
