import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const [livre, setLivre] = useState({
    code: '',
    titre: '',
    description: '',
    auteur: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/livre/${id}`);
        setLivre(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du livre:', error);
      }
    };

    fetchData();
  }, [id]);

  const modifierLivre = () => {
    axios.put(`http://localhost:3000/api/v1/livre/${id}`, livre)
      .then(response => {
        console.log('Livre modifié avec succès:', response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la modification du livre:', error);
      });
  };

  const handleChangement = (e) => {
    const { name, value } = e.target;
    setLivre(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Modifier le livre</h1>
      <form onSubmit={modifierLivre}>
        <label>
          Code:
          <input type="text" name="code" value={livre.code} onChange={handleChangement} />
        </label>
        <label>
          Titre:
          <input type="text" name="titre" value={livre.titre} onChange={handleChangement} />
        </label>
        <label>
          Description:
          <textarea name="description" value={livre.description} onChange={handleChangement}></textarea>
        </label>
        <label>
          Auteur:
          <input type="text" name="auteur" value={livre.auteur} onChange={handleChangement} />
        </label>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  );
}

export default EditBook;
