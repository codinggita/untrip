import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import "../css/home-header.css"; // Import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEnvelope, faUserCircle, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Avatar, Menu, MenuItem, Button, Select, FormControl } from "@mui/material";
import logo from "../img/default.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [language, setLanguage] = useState("English");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }

    const storedLang = localStorage.getItem("language");
    if (storedLang) {
      setLanguage(storedLang);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAnchorEl(null);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setLanguage(selectedLang);
    localStorage.setItem("language", selectedLang);
  };

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className="header">
      <div className="logo">
        {/* Logo Image */}
        <Link to="/" className="logo-link">
          <div className="img-for-header">
            <img src={logo} alt="Shop Travel Logo" />
          </div>
        </Link>

        {/* Shop Travel with Down Arrow */}
        <h1 onClick={handleMenuClick} className="shop-travel-title">
          Shop Travel <FontAwesomeIcon icon={faCaretDown} className="down-arrow" />
        </h1>

        {/* Dropdown Menu for Shop Travel */}
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/">Home</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/hotels">Hotels</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/flights">Flights</MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/contact">Contact Us</MenuItem>
        </Menu>
      </div>

      <nav className="menu">
        <ul className="menu-list">
          {/* Language Selector */}
          <li className="language-selector">
            <FontAwesomeIcon icon={faGlobe} />
            <FormControl sx={{ minWidth: 120, marginLeft: "8px" }}>
              <Select
                value={language}
                onChange={handleLanguageChange}
                displayEmpty
                inputProps={{ "aria-label": "Language Select" }}
                sx={{
                  fontSize: "14px",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  padding: "2px 5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="हिन्दी">हिन्दी</MenuItem>
                <MenuItem value="Español">Español</MenuItem>
                <MenuItem value="Français">Français</MenuItem>
              </Select>
            </FormControl>
          </li>

          <li>List Your Property</li>
          <li>Support</li>
          <li>Trips</li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
          </li>

          {user ? (
            <li className="user-profile">
              <Button
                onClick={handleProfileClick}
                startIcon={user.image ? <Avatar src={user.image} /> : <FontAwesomeIcon icon={faUserCircle} />}
                sx={{
                  color: "#333",
                  textTransform: "none",
                  fontWeight: "normal",
                  padding: "8px 12px",
                  "&:hover": {
                    backgroundColor: "#e1f5fe"
                  }
                }}
              >
                {user.name}
              </Button>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
                <MenuItem disabled>{user.name}</MenuItem>
                <MenuItem disabled>{user.email}</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </li>
          ) : (
            <li className="sign-in">
              <Link to="/signin">Sign In</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
