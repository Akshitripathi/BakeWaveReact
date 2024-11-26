import React, { useState } from "react";
import "../css/contactus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [messageSent, setMessageSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessageSent(true);

    // Reset form data
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => setMessageSent(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="container">
        {messageSent && <div id="messagePopup" className="message-popup">Your message has been submitted!</div>}
        
        <img src="../img/shape.png" className="square" alt="" />
        
        <div className="form">
          <div className="contact-info">
            <h3 className="title left">Let's get in touch</h3>
            <p className="text">Any recommendations or query feel free to contact us. We will respond as soon as possible.</p>
            
            <div className="info">
              <div className="information">
                <img src="https://static.vecteezy.com/system/resources/previews/009/759/629/original/eps10-pink-location-map-icon-isolated-on-white-background-pinpoint-symbol-in-a-simple-flat-trendy-modern-style-for-your-website-design-logo-pictogram-and-mobile-application-vector.jpg" className="icon" alt="" style={{ height: "4rem", width:"3rem" }} />
                <p>Chitkara University</p>
              </div>
              <div className="information">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1Oci6sVLby-nDPbH_Loyk0uQjnnrJ3hlvmRS5VQYBA&s" className="icon" alt="" />
                <p>mani.akshi1804@gmail.com</p>
              </div>
              <div className="information">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2D4NRYWsXfmHN_CwRRgvcDWwZ-_NsjyvKYzD5FJzEjw&s" className="icon" alt="" />
                <p>+91 9255193520</p>
              </div>
            </div>

            <div className="social-media" style={{marginTop:"0.7rem"}}>
              <p>Connect with us:</p>
              <div className="social-icons">
                <a href="https://www.facebook.com/">
                  <FontAwesomeIcon icon={faFacebookF} style={{height:"2.3rem", marginTop: "1rem"}} />
                </a>
                <a href="https://x.com/?lang=en-in&mx=2">
                  <FontAwesomeIcon icon={faTwitter} style={{height:"2.3rem", marginTop: "1rem" }}/>
                </a>
                <a href="https://www.instagram.com/?hl=en">
                  <FontAwesomeIcon icon={faInstagram} style={{height:"2.3rem", marginTop: "1rem" }}/>
                </a>
                <a href="https://in.linkedin.com/">
                  <FontAwesomeIcon icon={faLinkedinIn} style={{height:"2.3rem", marginTop: "1rem" }}/>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <span className="circle one"></span>
            <span className="circle two"></span>
            <form onSubmit={handleSubmit} autoComplete="off">
              <h3 className="title right">Contact us</h3>
              <div className="input-container">
                <input 
                  type="text" 
                  name="name" 
                  className="input" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
                <label style={{marginTop: "0.5rem"}}>Username</label>
              </div>
              <div className="input-container">
                <input 
                  type="email" 
                  name="email" 
                  className="input" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
                <label style={{marginTop: "0.5rem"}}>Email</label>
              </div>
              <div className="input-container">
                <input 
                  type="tel" 
                  name="phone" 
                  className="input" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                />
                <label style={{marginTop: "0.5rem"}}>Phone</label>
              </div>
              <div className="input-container textarea">
                <textarea 
                  name="message" 
                  className="input" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required
                ></textarea>
                <label style={{marginTop: "0.5rem"}}>Message</label>
              </div>
              <button type="submit" className="btn">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
