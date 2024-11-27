import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodCard from './FoodCard';
import Navbar from './Navbar';
import '../css/style.css';
import '../css/Home.css';
import { useCart } from '../context/CartContext';

export default function FoodMenu() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('all');
    const { addToCart } = useCart(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                console.log(response);
                setProducts(response.data); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category.toLowerCase() === category);

    return (
        <div className="foodMenu">
            <Navbar /> 
            <h1>Menu</h1>
            <div className="categories">
                {['All','Breads', 'Cakes', 'Pastries', 'Cookies', 'Muffins', 'Pies'].map(cat => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat.toLowerCase())}
                        className="cat"
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            <div className="foodCard">
                {filteredProducts.map(product => (
                    <FoodCard 
                        key={product.product_id} 
                        product={product} 
                        addToCart={addToCart} 
                    />
                ))}
            </div>

            <footer className="footer">
            <div className="footer-container">
    
    <FooterSection
      title="About Us"
      items={["Fresh Food", "Quality", "Affordable", "Offers"]}
    />
    
    <FooterSection
      title="Top Dishes"
      items={["Cakes", "Donuts", "Brownie", "Ice-Cream"]}
    />
    
    <FooterSection
      title="Offer"
      items={["50% OFF", "Bulk Order", "Coupons", "Exclusive Deals"]}
    />
    
    <div className="footer-section social-media">
      <h2>Connect With Us</h2>
      <div className="social-icons">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
    </div>
    
    <div className="footer-section newsletter">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Get the latest updates and offers delivered to your inbox.</p>
      <form className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          className="newsletter-input"
          required
        />
        <button type="submit" className="newsletter-button">Subscribe</button>
      </form>
    </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 BakeWave. All rights reserved.</p>
          </div>
            </footer>
        </div>
    );
}

function FooterSection({ title, items }) {
  return (
    <div className="text">
      <h2>{title}</h2>
      {items.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  );
}
