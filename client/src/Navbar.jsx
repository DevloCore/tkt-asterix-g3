import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><a href="/" className="navbar-link">Home</a></li>
        <li className="navbar-item"><a href="/menu" className="navbar-link">Commerces/attractions</a></li>
        <li className="navbar-item"><a href="#" className="navbar-link">Services</a></li>
        <li className="navbar-item"><a href="#" className="navbar-link">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;