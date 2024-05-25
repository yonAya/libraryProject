import React, { useState } from 'react';
import axios from 'axios';

function AddBook() {
  const [nouveauLivre, setNouveauLivre] = useState({
    code: '',
    titre: '',
    description: '',
    auteur: ''
  });

  const ajouterLivre = () => {
    axios.post('http://localhost:3000/api/v1/livre', nouveauLivre)
      .then(response => {
        console.log('Livre ajouté avec succès:', response.data);
        // Réinitialiser les champs du formulaire après l'ajout du livre
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
      <h1>Ajouter un livre</h1>
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

export default AddBook;
