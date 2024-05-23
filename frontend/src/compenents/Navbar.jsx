// Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importez Link depuis React Router
import { FcLibrary } from "react-icons/fc";
import './Navbar.css'; 

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" className="site-name"> <FcLibrary />BibliOnline</Link> 
      </div>
      <div className="center">
        <Link to="/livre" className="navbar-button">Livre</Link> 
        <button className="navbar-button">Emprunt</button>
        <button className="navbar-button">Client</button>
      </div>
    </div>
  );
}

export default Navbar;
