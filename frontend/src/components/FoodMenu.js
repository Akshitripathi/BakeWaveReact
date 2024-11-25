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
    const { addToCart } = useCart(); // Get addToCart from context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/products');
                console.log(response);
                setProducts(response.data); // Store all products in the state
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    
    // Filter products based on the selected category
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category.toLowerCase() === category);

    return (
        <div className="foodMenu">
            <Navbar /> {/* Navbar will show cart count */}
            <h1>Menu</h1>
            <div className="categories">
                {['all', 'Special', 'Pâtisserie', 'Gâteaux', 'Tartes', 'Viennoiseries', 'Others'].map(cat => (
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
                        product={product} // Pass the entire product object to FoodCard
                        addToCart={addToCart} 
                    />
                ))}
            </div>

            <footer className="footer">
                {/* Footer content */}
            </footer>
        </div>
    );
}
