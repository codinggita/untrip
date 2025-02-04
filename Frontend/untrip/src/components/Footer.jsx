// Footer.jsx
import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Jobs</li>
            <li>List your property</li>
            <li>Partnerships</li>
            <li>Newsroom</li>
            <li>Investor Relations</li>
            <li>Advertising</li>
            <li>Affiliate Marketing</li>
            <li>Feedback</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li>United States of America travel guide</li>
            <li>Hotels in United States of America</li>
            <li>Vacation rentals in United States of America</li>
            <li>Vacation packages in United States of America</li>
            <li>Domestic flights</li>
            <li>Car rentals in United States of America</li>
            <li>All accommodation types</li>
            <li>One Key credit cards</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Policies</h3>
          <ul>
            <li>Privacy</li>
            <li>Cookies</li>
            <li>Terms of use</li>
            <li>Accessibility</li>
            <li>Your privacy choices</li>
            <li>Content guidelines and reporting content</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Help</h3>
          <ul>
            <li>Support</li>
            <li>Cancel your hotel or vacation rental booking</li>
            <li>Cancel your flight</li>
            <li>Refund basics</li>
            <li>Use a coupon</li>
            <li>International travel documents</li>
          </ul>
        </div>
      </div>
      <div className="footer-copyright">
        <p>© 2025 Untrip, Inc., an Untrip Group company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
