// App.js

import React from 'react';
import Navbar from '../src/compenents/Navbar'; // Importation du composant Navbar
import Footer from '../src/compenents/Footer'; // Importation du composant Footer
import Accueil from '../src/compenents/Accueil'; // Importation du composant Accueil
import './App.css'; // Importation des styles CSS globaux

function App() {
  return (
    
      <div className="app">
        <div className="content">
          <div> <Navbar /></div>
        
          <Accueil />
        </div>
        <Footer />
      </div>
    );
  
}

export default App;
