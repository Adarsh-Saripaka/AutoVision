import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h3>About Us</h3>
          <p>Your premier destination for luxury and performance vehicles. We bring you the finest collection of cars from around the world.</p>
        </div>

        <div className='footer-section'>
          <h3>Quick Links</h3>
          <a href='/'>Home</a>
          <a href='/cars'>Browse Cars</a>
          <a href='/about'>About Us</a>
          <a href='/contact'>Contact</a>
          <a href='/financing'>Financing</a>
        </div>

        <div className='footer-section'>
          <h3>Customer Service</h3>
          <a href='/faq'>FAQ</a>
          <a href='/support'>Support</a>
          <a href='/warranty'>Warranty Info</a>
          <a href='/test-drive'>Schedule Test Drive</a>
          <a href='/trade-in'>Trade-In</a>
        </div>

        <div className='footer-section'>
          <h3>Contact Info</h3>
          <p>Email: info@carshowcase.com</p>
          <p>Phone: +1 (555) 123-4567</p>
          <p>Address: 123 Auto Lane, City, State 12345</p>
          <div className='social-links'>
            <a href='#' className='social-icon'>f</a>
            <a href='#' className='social-icon'>t</a>
            <a href='#' className='social-icon'>i</a>
            <a href='#' className='social-icon'>y</a>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; 2025 Car Showcase. All Rights Reserved.</p>
        <p>
          <a href='/privacy'>Privacy Policy</a> | 
          <a href='/terms'> Terms of Service</a>
        </p>
      </div>
    </footer>
  )
}

export default Footer