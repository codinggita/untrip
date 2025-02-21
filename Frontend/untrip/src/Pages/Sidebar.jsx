import React from "react";
import { Search, MapPin } from "lucide-react";
import "../css/Sidebar.css"; // Import the CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* Buttons */}
        <div className="button-group">
          <button className="sidebar-buttonn">
            <MapPin className="icon" />
            View in a map
          </button>
          <button className="sidebar-buttonn">Compare properties</button>
        </div>

        {/* Search Input */}
        <div className="search-containerr">
          <Search className="search-icon" />
          <input type="text" placeholder="e.g Marriott" className="search-input" />
        </div>

        {/* Price Slider */}
        <div className="section">
          <h3 className="section-title">Price per Room</h3>
          <div className="slider-container">
            <input type="range" min="0" max="1000" step="1" className="slider" />
            <div className="price-range">
              <span className="price-box">$0</span>
              <span className="price-box">$1,000+</span>
            </div>
          </div>
        </div>

        {/* Popular Filters */}
        <div className="section">
          <h3 className="section-title">Popular filters</h3>
          <div className="filter-list">
            {["Free breakfast", "Pool", "Free WiFi", "Spa", "Beach access"].map((filter) => (
              <div key={filter} className="filter-item">
                <input type="checkbox" id={filter} className="filter-checkbox" />
                <label htmlFor={filter} className="filter-label">{filter}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
