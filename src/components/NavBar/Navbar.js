import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ handleLogOut }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("currentUser");
    handleLogOut(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="logo">
          Bug Tracker
        </Link>
        <div className="hamburger">
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} onClick={handleToggleMenu} />
        </div>
      </div>
      <div className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/Dashboard" onClick={handleToggleMenu}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/Teams" onClick={handleToggleMenu}>
              Teams
            </Link>
          </li>
          <li>
            <Link to="/Projects" onClick={handleToggleMenu}>
              Projects
            </Link>
          </li>
          <li>
            <Link to="/Issues" onClick={handleToggleMenu}>
              Issues
            </Link>
          </li>
          <li>
            <Link to="/Users" onClick={handleToggleMenu}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/Invitations" onClick={handleToggleMenu}>
              Invitations
            </Link>
          </li>
          <li>
            <button className="btn-grad" onClick={handleSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
