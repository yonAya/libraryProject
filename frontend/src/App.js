import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './compenents/Navbar'; 
import Footer from './compenents/Footer'; 
import Accueil from './compenents/Accueil'; 
import Livre from './compenents/livre';
import AddBook from './compenents/AddBook';
import EditBook from './compenents/EditBook';
import AddClient from './compenents/AddClient'; 
import EditClient from './compenents/EditClient'; 
import ClientListe from './compenents/ClientListe'; 
import Emprunt from './compenents/Emprunt';
import AddEmprunt from './compenents/AddEmprunt';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="content">
          <Navbar />
          <Routes> 
            <Route path="/" element={<Accueil />} /> 
            <Route path="/livre" element={<Livre />} />
            <Route path="/AddBook" element={<AddBook />} />

            <Route path="/Editbook/:id" element={<EditBook />} />
            <Route path="/addclient" element={<AddClient />} />
            <Route path="/AddEmprunt" element={<AddEmprunt />} /> {/* Ajoutez la route pour AddClient */}
            <Route path="/editclient/:id" element={<EditClient />} /> {/* Ajoutez la route pour EditClient avec l'ID dynamique */}
            <Route path="/ClientListe" element={<ClientListe />} />
            <Route path="/Emprunt" element={<Emprunt />} /> {/* Ajoutez la route pour ListeClients */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
