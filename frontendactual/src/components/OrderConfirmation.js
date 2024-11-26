import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import useCart
import axios from 'axios';

function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems } = useCart(); // Access cartItems from CartContext
    const { orderDetails } = location.state || { items: [], total: 0 };
    const [calculatedTotal, setCalculatedTotal] = useState(0);

    useEffect(() => {
        if (orderDetails.items.length > 0) {
            const totalAmount = orderDetails.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
            );
            setCalculatedTotal(totalAmount);
        }
    }, [orderDetails.items]);

    const handleConfirmOrder = async () => {
        const token = localStorage.getItem('token');
    
            if (!token) {
                alert('User is not authenticated. Please log in.');
                navigate('/login');
                return;
            }

        if (!orderDetails.items || orderDetails.items.length === 0) {
            alert('No items to confirm. Please add items to the cart.');
            return;
        }
    
        const payload = {
            items: orderDetails.items.map((item) => ({
                productId: item._id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),
            totalAmount: calculatedTotal,
        };
    
        try {
            // Retrieve token from localStorage or any other storage
            
    
            const response = await axios.post(
                'http://localhost:4000/api/orders',
                payload,
                {   withCredentials:true,
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the Authorization header
                    },
                }
            );
    
            console.log('Order Response:', response.data);
            navigate('/'); // Redirect to success page
        } catch (error) {
            console.error('Order Error:', error.response?.data || error);
            alert('Failed to place the order. Please try again.');
        }
    };
    

    if (!orderDetails || orderDetails.items.length === 0) {
        return <p>No items in the order. Please add items to the cart and try again.</p>;
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Order Confirmation</h1>
            <div style={styles.itemsContainer}>
                {orderDetails.items.map((item, index) => (
                    <div key={index} style={styles.item}>
                        <img
                            src={`http://localhost:4000/${item.image}`}
                            alt={item.name}
                            style={styles.itemImage}
                        />
                        <div style={styles.itemDetails}>
                            <p style={styles.itemName}>{item.name}</p>
                            <p style={styles.itemQuantity}>Quantity: {item.quantity}</p>
                            <p style={styles.itemPrice}>Price per item: ₹{item.price.toFixed(1)}</p>
                            <p style={styles.itemTotal}>Total: ₹{(item.price * item.quantity).toFixed(1)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div style={styles.totalContainer}>
                <p style={styles.totalText}>Total Amount: ₹{calculatedTotal.toFixed(1)}</p>
            </div>
            <button style={styles.button} onClick={handleConfirmOrder}>
                Confirm Order
            </button>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '700px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        fontSize: '1.8em',
        color: '#333',
        marginBottom: '20px',
    },
    itemsContainer: {
        marginBottom: '30px',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '15px 0',
        borderBottom: '1px solid #ddd',
    },
    itemImage: {
        width: '90px',
        height: '100px',
        borderRadius: '8px',
        objectFit: 'cover',
        marginRight: '15px',
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        color: '#333',
        marginLeft: '2rem',
        marginBottom: '3px',
    },
    itemQuantity: {
        fontSize: '1em',
        color: '#666',
        marginLeft: '2rem',
        marginBottom: '3px',
    },
    itemPrice: {
        fontSize: '1em',
        color: '#666',
        marginLeft: '2rem',
        marginBottom: '3px',
    },
    itemTotal: {
        fontSize: '1em',
        fontWeight: 'bold',
        marginLeft: '2rem',
        color: '#444',
    },
    totalContainer: {
        textAlign: 'center',
        marginTop: '20px',
        paddingTop: '10px',
        borderTop: '2px solid #333',
    },
    totalText: {
        fontSize: '1.4em',
        fontWeight: 'bold',
        color: '#222',
    },
    button: {
        display: 'block',
        width: '100%',
        padding: '12px',
        marginTop: '20px',
        backgroundColor: '#e04f75',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1.1em',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
    },
};

export default OrderConfirmation;
