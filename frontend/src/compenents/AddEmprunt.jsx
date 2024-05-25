import React, { useState } from 'react';
import axios from 'axios';

function AddEmprunt() {
  const [livreId, setLivreId] = useState('');
  const [clientId, setClientId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/emprunt', { livreId, clientId });
      console.log('Emprunt ajouté avec succès :', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'emprunt :', error);
    }
  };

  return (
    <div>
      <h1>Ajouter un nouvel emprunt</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Livre ID:
          <input type="text" value={livreId} onChange={(e) => setLivreId(e.target.value)} />
        </label>
        <label>
          Client ID:
          <input type="text" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        </label>
        <button type="submit">Ajouter Emprunt</button>
      </form>
    </div>
  );
}

export default AddEmprunt;
