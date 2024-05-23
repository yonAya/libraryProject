import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importez Routes et Route
import Navbar from '../src/compenents/Navbar'; 
import Footer from '../src/compenents/Footer'; 
import Accueil from '../src/compenents/Accueil'; 
import Livre from './compenents/livre';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Navbar />
          <Routes> {/* Remplacez <Switch> par <Routes> */}
            <Route path="/" element={<Accueil />} /> {/* Utilisez element pour définir le composant à rendre */}
            <Route path="/livre" element={<Livre />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
