// Navbar.jsx

import React from 'react';
import { FcLibrary } from "react-icons/fc"; // Importation de l'icône FcLibrary
import './Navbar.css'; 

function Navbar() {
  return (
    <div className="navbar">
      <div className="left">
        
        <span className="site-name"> <FcLibrary />BibliOnline</span>
      </div>
      <div className="center">
        <button className="navbar-button">Livre</button>
        <button className="navbar-button">Emprunt</button>
        <button className="navbar-button">Client</button>
      </div>
    </div>
  );
}

export default Navbar;
