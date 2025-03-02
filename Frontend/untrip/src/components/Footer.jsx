import React from 'react';
import '../css/Footer.css';
import { Facebook, Twitter, Instagram, Linkedin, ChevronRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row justify-between mb-12 gap-8">
          <div className="lg:w-1/3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Untrip</h2>
            </div>
            <p className="text-slate-300 mb-6">Experience the world differently with personalized travel solutions and unforgettable adventures.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/yasar__p" className="text-slate-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/in/yasar300/" className="text-slate-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div className="lg:w-1/2">
            <h3 className="text-lg font-medium mb-4">Subscribe to our newsletter</h3>
            <p className="text-slate-300 mb-4">Stay updated with travel tips, exclusive deals, and destination highlights.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-slate-800 p-3 rounded-lg flex-grow text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        
        <div className="border-t border-slate-700 my-8"></div>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="footer-section">
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Jobs", "List your property", "Partnerships", "Newsroom", "Investor Relations", "Advertising", "Affiliate Marketing", "Feedback"].map(item => (
                <li key={item} className="text-slate-300 hover:text-white transition-colors flex items-center group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="text-lg font-medium mb-4">Explore</h3>
            <ul className="space-y-2">
              {[
                "United States travel guide",
                "Hotels in United States",
                "Vacation rentals",
                "Vacation packages",
                "Domestic flights",
                "Car rentals",
                "All accommodation types",
                "One Key credit cards"
              ].map(item => (
                <li key={item} className="text-slate-300 hover:text-white transition-colors flex items-center group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="text-lg font-medium mb-4">Policies</h3>
            <ul className="space-y-2">
              {[
                "Privacy",
                "Cookies",
                "Terms of use",
                "Accessibility",
                "Your privacy choices",
                "Content guidelines"
              ].map(item => (
                <li key={item} className="text-slate-300 hover:text-white transition-colors flex items-center group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-section">
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              {[
                "Support",
                "Cancel booking",
                "Cancel flight",
                "Refund basics",
                "Use a coupon",
                "Travel documents"
              ].map(item => (
                <li key={item} className="text-slate-300 hover:text-white transition-colors flex items-center group">
                  <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
       
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">© 2025 Untrip, Inc., an Untrip Group company. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
