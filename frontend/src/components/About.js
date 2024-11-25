import React from "react";
import "../css/AboutUs.css"; 
import "../css/Home.css";
import Navbar from "./Navbar";
export default function AboutUs() {
  return (
    <div className="container-fluid">
      <Navbar/>
      <div id="header">
        <div className="layer"></div>
        <img src="../img/bakery p 2.jpg" alt="About Us" />
        <div className="centered">
          <h1>About Us</h1>
        </div>
      </div>

      <div id="section1">
        <h1>One of the best bakery known for the deserts.</h1>
        <p>
          Step into our bakery, and you'll be greeted by a tantalizing array of treats...
        </p>
      </div>

      <div id="section2">
        <div className="layer"></div>
        <img src="../img/bakery p 3.jpg" id="banner1" alt="About Us" />
        <div className="container centered">
          <div className="row">
            <div className="col-md-3 col-6 col">
              <h1>15+</h1>
              <h2>Baking Suppliers</h2>
            </div>
            <div className="col-md-3 col-6 col">
              <h1>150k+</h1>
              <h2>Reviews</h2>
            </div>
            <div className="col-md-3 col-6 col">
              <h1>100k+</h1>
              <h2>Blog</h2>
            </div>
            <div className="col-md-3 col-6 col">
              <h1></h1>
              <h2>International certified bakers</h2>
            </div>
          </div>
        </div>
      </div>

      <div id="section3">
        <h1>Top Reasons to Stay</h1>
        <div className="container grid-layout">
  <div className="article" style={{ backgroundImage: "url(../img/behind.jpg)" }}>
    <div className="article-body">
      <h5 className="article-title">Our Commitment</h5>
      <p className="article-text">At our Bakery, quality is our top priority...</p>
    </div>
  </div>
  <div className="article" style={{ backgroundImage: "url(../img/behind1.jpg)", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
    <div className="article-body">
      <h5 className="article-title">Community Involvement</h5>
      <p className="article-text">At our Bakery, we believe in giving back...</p>
    </div>
  </div>
  <div className="article" style={{ backgroundImage: "url(../img/behind3.jpg)" }}>
    <div className="article-body">
      <h5 className="article-title">Free Wifi</h5>
      <p className="article-text">At our Bakery, we understand the importance of staying connected...</p>
    </div>
  </div>
  <div className="article" style={{ backgroundImage: "url(../img/behind4.jpg)" }}>
    <div className="article-body">
      <h5 className="article-title">Visit Us Today</h5>
      <p className="article-text">Come experience the magic of our bakery for yourself...</p>
    </div>
  </div>
</div>

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
};

function FooterSection({ title, items }) {
  return (
    <div className="text">
      <h2>{title}</h2>
      {items.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  );
}