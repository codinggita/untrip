import React from "react";
import "../css/home-header.css"; // Import your CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import logo from "../img/default.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <div className="img-for-header">
        <img src={logo} alt="Shop Travel Logo" />
        </div>
        <h1>Shop Travel</h1>
      </div>
      <nav className="menu">
        <ul className="menu-list">
          <li>
            <FontAwesomeIcon icon={faGlobe} /> English
          </li>
          <li>List Your Property</li>
          <li>Support</li>
          <li>Trips</li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
          </li>
          <li className="sign-in">Sign In</li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
