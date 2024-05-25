import React, { useState } from 'react';
import axios from 'axios';

function AddClient() {
  const [nouveauClient, setNouveauClient] = useState({
    nom: '',
    prenom: '',
    email: ''
  });

  const ajouterClient = () => {
    axios.post('http://localhost:3000/api/v1/client', nouveauClient)
      .then(response => {
        console.log('Client ajouté avec succès:', response.data);
        // Réinitialiser les champs du formulaire après l'ajout du client
        setNouveauClient({
          nom: '',
          prenom: '',
          email: ''
        });
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du client:', error);
      });
  };

  const handleChangement = (e) => {
    const { name, value } = e.target;
    setNouveauClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Ajouter un client</h1>
      <form onSubmit={ajouterClient}>
        <label>
          Nom:
          <input type="text" name="nom" value={nouveauClient.nom} onChange={handleChangement} />
        </label>
        <label>
          Prénom:
          <input type="text" name="prenom" value={nouveauClient.prenom} onChange={handleChangement} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={nouveauClient.email} onChange={handleChangement} />
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddClient;
