import React, { createContext, useContext, useState, useEffect } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const storedCart = localStorage.getItem('cartItems');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem._id === item._id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem._id === item._id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeItemFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    };

    const updateCartItemQuantity = (id, action) => {
        setCartItems((prevItems) => {
            return prevItems.map((item) => {
                if (item._id === id) {
                    if (action === 'increase') {
                        return { ...item, quantity: item.quantity + 1 };
                    } else if (action === 'decrease') {
                        if (item.quantity === 1) {
                            return null; 
                        } else {
                            return { ...item, quantity: item.quantity - 1 };
                        }
                    }
                }
                return item;
            }).filter(item => item !== null); 
        });
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems, 
                addToCart,
                removeItemFromCart,
                updateCartItemQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
