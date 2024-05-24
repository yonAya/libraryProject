import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './livre.css';

function Livre() {
  const [livres, setLivres] = useState([]);
  const [nouveauLivre, setNouveauLivre] = useState({
    code: '',
    titre: '',
    description: '',
    auteur: ''
    
  });
  const [livreSelectionne, setLivreSelectionne] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/livre');
        setLivres(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des livres :', error);
      }
    };
  
    fetchData();
  }, []);
  
  const afficherDetails = (livre) => {
    setLivreSelectionne(livre);
  };

  const modifierLivre = (livre) => {
    console.log("Modifier le livre:", livre);
  };

  const supprimerLivre = (livre) => {
    axios.delete(`http://localhost:3000/api/v1/livre/${livre._id}`)
      .then(response => {
        setLivres(livres.filter(l => l._id !== livre._id));
        if (livreSelectionne && livreSelectionne._id === livre._id) {
          setLivreSelectionne(null);
        }
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du livre:', error);
      });
  };

  const ajouterLivre = () => {
    axios.post('http://localhost:3000/api/v1/livre', nouveauLivre)
      .then(response => {
        setLivres([...livres, response.data]);
        setNouveauLivre({
          code: '',
          titre: '',
          description: '',
          auteur: ''
        });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du livre:', error);
      });
  };

  const handleChangement = (e) => {
    const { name, value } = e.target;
    setNouveauLivre(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Liste des livres</h1>
      <ul>
        {livres.map(livre => (
          <li key={livre._id}>
            {livre.titre} - <button onClick={() => afficherDetails(livre)}>Voir détails</button> - <button onClick={() => supprimerLivre(livre)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {livreSelectionne && (
        <div>
          <h2>Détails du livre</h2>
          <p><strong>Code:</strong> {livreSelectionne.code}</p>
          <p><strong>Titre:</strong> {livreSelectionne.titre}</p>
          <p><strong>Description:</strong> {livreSelectionne.description}</p>
          <p><strong>Auteur:</strong> {livreSelectionne.auteur}</p>
          <button onClick={() => modifierLivre(livreSelectionne)}>Modifier le livre</button>
        </div>
      )}

      <h2>Ajouter un livre</h2>
      <form onSubmit={ajouterLivre}>
        <label>
          Code:
          <input type="text" name="code" value={nouveauLivre.code} onChange={handleChangement} />
        </label>
        <label>
          Titre:
          <input type="text" name="titre" value={nouveauLivre.titre} onChange={handleChangement} />
        </label>
        <label>
          Description:
          <textarea name="description" value={nouveauLivre.description} onChange={handleChangement}></textarea>
        </label>
        <label>
          Auteur:
          <input type="text" name="auteur" value={nouveauLivre.auteur} onChange={handleChangement} />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default Livre;
