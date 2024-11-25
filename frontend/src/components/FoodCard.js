import React from 'react';
import '../css/FoodCard.css';

export default function FoodCard({ product, addToCart }) {
    const { name, price, image } = product;

    // Format the image URL correctly (replace backslashes with forward slashes)
    const imageUrl = `http://localhost:4000/${image.replace(/\\/g, '/')}`;

    return (
        <div className="food-card">
            <img
                className="food-card-image"
                src={imageUrl}
                alt={name}
                onError={(e) => (e.target.src = '/default-image.jpg')} // Default image fallback
            />
            <div className="food-card-details">
                <h3>{name}</h3>
                <p>₹{price.toFixed(2)}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
        </div>
    );
}
