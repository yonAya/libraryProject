
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p>Tous droits réservés &copy; {new Date().getFullYear()}</p>
    </footer>
  );
}

export default Footer;
