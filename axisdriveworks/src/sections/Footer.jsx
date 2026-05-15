import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="contact" className='footer'>
      <div className='footer-content'>
        
        <div className='footer-section'>
          <h3>About Us</h3>
          <p>
            Welcome to your destination for the world's most exquisite luxury and high-performance vehicles.
            Here, passion meets precision — we curate only the finest cars from across the globe,
            built to move you in every way.
          </p>
        </div>

        <div className='footer-section'>
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="#brands" onClick={(e) => { e.preventDefault(); document.getElementById("brands")?.scrollIntoView({ behavior: "smooth" }); }}>Browse Cars</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}>Contact</a>
        </div>

        <div className='footer-section'>
          <h3>Customer Service</h3>
          <a href="mailto:support@axisdriveworks.com">Email Support</a>
          <a href="tel:+15551234567">Call Us</a>
        </div>

        <div className='footer-section'>
          <h3>Contact Info</h3>
          <p>Email: support@axisdriveworks.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Auto Lane, City, State 12345</p>

          <div className='social-links'>
            <a href='https://facebook.com' target="_blank" rel="noopener noreferrer" className='social-icon' aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href='https://twitter.com' target="_blank" rel="noopener noreferrer" className='social-icon' aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href='https://instagram.com' target="_blank" rel="noopener noreferrer" className='social-icon' aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href='https://youtube.com' target="_blank" rel="noopener noreferrer" className='social-icon' aria-label="YouTube"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

      </div>

      <div className='footer-bottom'>
        <p>&copy; {new Date().getFullYear()} Axis DriveWorks. All Rights Reserved.</p>
        <p>
          <a href='/privacy'>Privacy Policy</a> |
          <a href='/terms'> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
