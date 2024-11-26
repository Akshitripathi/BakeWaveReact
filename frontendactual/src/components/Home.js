import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';
import Navbar from './Navbar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faClock, faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import products from '../productData.js'; const videos = [
    {
      id: 1,
      videoSrc: "./img/cake_video.mp4",
      altText: "Cake Video",
    },
    {
      id: 2,
      videoSrc: "./img/donut_video.mp4",
      altText: "Donut Video",
    },
    {
      id: 3,
      videoSrc: "./img/cupcake_video.mp4",
      altText: "Cupcake Video",
    },
    {
      id: 4,
      videoSrc: "./img/biscuits_video.mp4",
      altText: "Biscuits Video",
    }
  ];
export default function Home() {
  const [carts, setCarts] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const navigate= useNavigate();
 
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCarts(savedCart);
  }, []);

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(carts));
  }, [carts]);

  const addToCart = (productId) => {
    setCarts((prevCarts) => {
      const existingProduct = prevCarts.find((item) => item.product_id === productId);
      if (existingProduct) {
        return prevCarts.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const product = products.find((p) => p.id === productId);
        return [...prevCarts, { product_id: productId, price: product.price, quantity: 1 }];
      }
    });
  };

  const toggleCart = () => setShowCart(!showCart);

  const displayTotalPrice = () => carts.reduce((total, item) => {
    const product = products.find((p) => p.id === item.product_id);
    return total + (item.quantity * product.price);
  }, 0);

  const handleClick=()=>{
    navigate('/food-menu');
  }

  return (
    <div className={`home-container ${showCart ? 'showCart' : ''}`}>
      
<Navbar/>
      <div className="main">
        <div className="left">
          <h1>Welcome to BakeWave</h1>
          <p>Where every bite is a piece of heaven!!</p>
          <p>Come and experience the magic of freshly baked goods made with love and the finest ingredients</p>
        </div>
        
      </div>

      <section id="features">
        <h2>Some Extra Features</h2>
        <div className="rowitems">
          <FeatureBox src="./img/online_ordering.png" label="Online Ordering" />
          <FeatureBox src="./img/catering.png" label="Catering Services" />
          <FeatureBox src="./img/specials_holiday_offers.png" label="Special Holiday Offers" />
          <FeatureBox src="./img/customisable.png" label="Customization Service" />
        </div>
      </section>

      <div id="food">
      <div className="head">
        <h1>Menu</h1>
      </div>
      <div className="foodCard">
        {videos.map((video) => (
          <div key={video.id} className="card" data-id={video.id}>
            <div className="image-container">
              <video
                src={video.videoSrc}
                type="video/mp4"
                autoPlay
                muted
                loop
                alt={video.altText}
              ></video>
            </div>
          </div>
        ))}
      </div>
      <a
        onClick={handleClick}
        style={{
          textDecoration: 'none',
          fontSize: '25px',
          fontFamily: 'Dancing Script',
          fontWeight: 'bolder',
          color: 'black',
        }}
      >
        <p style={{marginLeft:'42%',marginRight:'40%', justifyItems: 'center', marginTop: '1.2rem' }}> ~ Explore More ~</p>
      </a>
    </div>

    <section id="gallery">
        <h1>Our Gallery</h1>
        <div className="gallery">
          <div className="item item-1"><img src="../img/dewi-ika-putri-ZDD7O-grjBo-unsplash.jpg" alt="" /></div>
          <div className="item item-1"><img src="https://media.timeout.com/images/105947323/image.jpg" alt="" /></div>
          <div className="item item-2"><img src="../img/gallery1.jpg" alt="" /></div>
          <div className="item item-2"><img src="https://t4.ftcdn.net/jpg/06/44/38/07/360_F_644380708_t8KJpv0xf7B93tdD5iNpsktVQwp3MW80.jpg" alt="" /></div>
          <div className="item item-3"><img src="../img/piotr-szulawski-DCmUhk54F6M-unsplash.jpg" alt="" /></div>
          <div className="item item-4"><img src="../img/caglar-araz-n_tX6yYBVjc-unsplash.jpg" alt="" /></div>
          <div className="item item-5"><img src="../img/dave-photoz-Ksrmm0EHdgw-unsplash.jpg" alt="" /></div>
          <div className="item item-6"><img src="../img/gallery2.jpg" alt="" /></div>
        </div>
      </section>

      <section id="contact-detail" className="section-p1">
        <div className="detail">
          <FontAwesomeIcon icon={faClock} />
          <span>Visit Us Today</span>
          <h2>Open 10.30 am to 11.30 pm</h2>
          <h3>Open till 2.00 am on weekends</h3>
          <div>
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> Chitkara University Rajpura Patiala</p>
            <p><FontAwesomeIcon icon={faEnvelope} />  mani.akshi1804@gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} />  +91 9255193520</p>
          </div>
        </div>
        <div className="map">
          <iframe src="https://www.google.com/maps/embed?..." allowFullScreen></iframe>
        </div>
      </section>

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

function FeatureBox({ src, label }) {
  return (
    <div className="container-box">
      <div className="container-image">
        <img src={src} alt={label} />
      </div>
      <a href="#">{label}</a>
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
