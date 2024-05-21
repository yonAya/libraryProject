// Accueil.jsx

import React from 'react';
import './Accueil.css'; 
import welcomeImage from '../images/Library-bro.png'; 

function Accueil() {
  return (
    <div className="accueil">
      <div className="content">
        <div className="text">
          <h2>Bienvenue sur notre site de gestion des emprunts d'une librairie</h2>
          <p>
          Bienvenue sur BibliOnline, votre plateforme de gestion d'emprunts de livres en ligne. Que vous soyez un passionné de lecture, un étudiant assidu ou un amateur de littérature, BibliOnline est là pour simplifier votre expérience de prêt de livres.

Naviguez à travers notre vaste collection de livres, explorez différents genres littéraires, et trouvez les ouvrages qui captiveront votre intérêt. Avec BibliOnline, vous pouvez emprunter vos livres préférés en quelques clics, sans tracas ni tracas.
          </p>
        </div>
        <img src={welcomeImage} alt="Welcome" className="welcome-image" />
      </div>
    </div>
  );
}

export default Accueil;
