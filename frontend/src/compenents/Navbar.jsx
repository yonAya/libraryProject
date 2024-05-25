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
       <Link to="ClientListe"   className="navbar-button">Client</Link> 
       <Link to="Emprunt"   className="navbar-button">Emprunt</Link> 
      </div>
    </div>
  );
}

export default Navbar;
