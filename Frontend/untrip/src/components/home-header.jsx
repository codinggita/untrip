import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; 
import "../css/home-header.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faGlobe, 
  faEnvelope, 
  faUserCircle, 
  faCaretDown, 
  faSignOutAlt,
  faUser,
  faCog,
  faHistory,
  faCompass,
  faHotel,
  faPlane,
  faSuitcase,
  faPercent,
  faHeadset
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import logo from "../img/default.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMainDropdown, setShowMainDropdown] = useState(false);
  const [language, setLanguage] = useState("English");
  
  const languageDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const mainDropdownRef = useRef(null);
  const languageButtonRef = useRef(null);
  const userButtonRef = useRef(null);
  const mainButtonRef = useRef(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    }
    
    
    const handleClickOutside = (event) => {
      
      if (languageButtonRef.current && 
          !languageButtonRef.current.contains(event.target) && 
          languageDropdownRef.current && 
          !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
      
      
      if (userButtonRef.current && 
          !userButtonRef.current.contains(event.target) && 
          userDropdownRef.current && 
          !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
      
      
      if (mainButtonRef.current && 
          !mainButtonRef.current.contains(event.target) && 
          mainDropdownRef.current && 
          !mainDropdownRef.current.contains(event.target)) {
        setShowMainDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setShowUserDropdown(false);
  };

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    setShowLanguageDropdown(false);
  };

  return (
    <div className="header">
      <div className="logo">
        
        <Link to="/" className="logo-link">
          <div className="img-for-header">
            <img src={logo} alt="Shop Travel Logo" />
          </div>
        </Link>

        
        <div 
          ref={mainButtonRef}
          onClick={() => setShowMainDropdown(!showMainDropdown)} 
          className="shop-travel-container"
        >
          <div className="shop-travel-icon-wrapper">
            <FontAwesomeIcon icon={faCompass} className="primary-icon" />
          </div>
          <h1 className="shop-travel-title">
            Shop Travel
          </h1>
          <div className={`shop-travel-dropdown-indicator ${showMainDropdown ? 'active' : ''}`}>
            <FontAwesomeIcon icon={faCaretDown} className="down-arrow" />
          </div>
          
         
          <div className="shop-travel-bg-effect"></div>
        </div>

        
        <div 
          ref={mainDropdownRef}
          className={`custom-dropdown travel-menu-dropdown ${showMainDropdown ? 'active' : ''}`}
        >
          <div className="dropdown-header">
            <span>Travel Options</span>
          </div>
          <div className="dropdown-content">
            <div className="dropdown-column">
              <Link to="/" className="dropdown-item enhanced" onClick={() => setShowMainDropdown(false)}>
                <FontAwesomeIcon icon={faCompass} className="dropdown-icon" />
                <div className="dropdown-text">
                  <span className="dropdown-item-title">Home</span>
                  <span className="dropdown-item-subtitle">Start your journey</span>
                </div>
              </Link>
              <Link to="/hotels" className="dropdown-item enhanced" onClick={() => setShowMainDropdown(false)}>
                <FontAwesomeIcon icon={faHotel} className="dropdown-icon" />
                <div className="dropdown-text">
                  <span className="dropdown-item-title">Hotels</span>
                  <span className="dropdown-item-subtitle">Find perfect accommodations</span>
                </div>
              </Link>
              <Link to="/flights" className="dropdown-item enhanced" onClick={() => setShowMainDropdown(false)}>
                <FontAwesomeIcon icon={faPlane} className="dropdown-icon" />
                <div className="dropdown-text">
                  <span className="dropdown-item-title">Flights</span>
                  <span className="dropdown-item-subtitle">Book your next trip</span>
                </div>
              </Link>
            </div>
            <div className="dropdown-column">
              <Link to="/packages" className="dropdown-item enhanced" onClick={() => setShowMainDropdown(false)}>
                <FontAwesomeIcon icon={faSuitcase} className="dropdown-icon" />
                <div className="dropdown-text">
                  <span className="dropdown-item-title">Travel Packages</span>
                  <span className="dropdown-item-subtitle">Complete vacation deals</span>
                </div>
              </Link>
              <Link to="/deals" className="dropdown-item enhanced" onClick={() => setShowMainDropdown(false)}>
                <FontAwesomeIcon icon={faPercent} className="dropdown-icon" />
                <div className="dropdown-text">
                  <span className="dropdown-item-title">Deals & Offers</span>
                  <span className="dropdown-item-subtitle">Special promotions</span>
                </div>
              </Link>
              <Link to="/contact" className="dropdown-item enhanced" onClick={() => setShowMainDropdown(false)}>
                <FontAwesomeIcon icon={faHeadset} className="dropdown-icon" />
                <div className="dropdown-text">
                  <span className="dropdown-item-title">Contact Us</span>
                  <span className="dropdown-item-subtitle">Get assistance</span>
                </div>
              </Link>
            </div>
          </div>
          <div className="dropdown-footer">
            <div className="featured-promo">
              <div className="promo-badge">New</div>
              <span>Save up to 30% with our summer packages</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="menu">
        <ul className="menu-list">
          
          <li className="language-selector">
            <div 
              ref={languageButtonRef}
              className="language-selector-container" 
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <FontAwesomeIcon icon={faGlobe} className="language-icon" />
              <span className="language-text">{language}</span>
              <FontAwesomeIcon icon={faCaretDown} className="language-dropdown-icon" />
            </div>
            
            
            <div 
              ref={languageDropdownRef}
              className={`custom-dropdown ${showLanguageDropdown ? 'active' : ''}`}
            >
              <div className="dropdown-item" onClick={() => handleLanguageSelect("English")}>English</div>
              <div className="dropdown-item" onClick={() => handleLanguageSelect("हिन्दी")}>हिन्दी</div>
              <div className="dropdown-item" onClick={() => handleLanguageSelect("Español")}>Español</div>
              <div className="dropdown-item" onClick={() => handleLanguageSelect("Français")}>Français</div>
              <div className="dropdown-item" onClick={() => handleLanguageSelect("Deutsch")}>Deutsch</div>
              <div className="dropdown-item" onClick={() => handleLanguageSelect("日本語")}>日本語</div>
            </div>
          </li>

          <li className="nav-item">List Your Property</li>
          <li className="nav-item">Support</li>
          <li className="nav-item">Trips</li>
          <li className="notification-icon">
            <FontAwesomeIcon icon={faEnvelope} />
          </li>

          {user ? (
            <li className="user-profile">
              <div 
                ref={userButtonRef}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="shop-travel-container"
                style={{ padding: "8px 12px 8px 8px" }}
              >
                {user.image ? 
                  <Avatar src={user.image} sx={{ width: 32, height: 32 }} /> : 
                  <FontAwesomeIcon icon={faUserCircle} size="lg" />
                }
                <span className="shop-travel-title" style={{ marginLeft: "8px" }}>{user.name}</span>
                <FontAwesomeIcon icon={faCaretDown} className="language-dropdown-icon" />
              </div>
              
              
              <div 
                ref={userDropdownRef}
                className={`custom-dropdownn ${showUserDropdown ? 'active' : ''}`}
              >
                <div className="dropdown-item">
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px", opacity: 0.7 }} />
                  My Profile
                </div>
                <div className="dropdown-item">
                  <FontAwesomeIcon icon={faHistory} style={{ marginRight: "10px", opacity: 0.7 }} />
                  Booking History
                </div>
                <div className="dropdown-item">
                  <FontAwesomeIcon icon={faCog} style={{ marginRight: "10px", opacity: 0.7 }} />
                  Account Settings
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item danger" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: "10px" }} />
                  Logout
                </div>
              </div>
            </li>
          ) : (
            <li className="sign-in">
              <Link to="/signin" className="sign-in-button">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
