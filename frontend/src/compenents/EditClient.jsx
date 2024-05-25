import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import de Link
import axios from 'axios';

function EditClient() {
  const { idClient } = useParams();

  const [client, setClient] = useState({
    nom: '',
    prenom: '',
    email: ''
  });

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/client/${idClient}`);
        setClient(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du client:', error);
      }
    };

    fetchClient();
  }, [idClient]);

  const modifierClient = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/client/${idClient}`, client);
      console.log('Client modifié avec succès');
    } catch (error) {
      console.error('Erreur lors de la modification du client:', error);
    }
  };

  const handleChangement = (e) => {
    const { name, value } = e.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Modifier un client</h1>
      <form onSubmit={modifierClient}>
        <label>
          Nom:
          <input type="text" name="nom" value={client.nom} onChange={handleChangement} />
        </label>
        <label>
          Prénom:
          <input type="text" name="prenom" value={client.prenom} onChange={handleChangement} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={client.email} onChange={handleChangement} />
        </label>
        <button type="submit">Modifier</button>
        <Link to="/clients">Retour à la liste des clients</Link> {/* Lien vers la liste des clients */}
      </form>
    </div>
  );
}

export default EditClient;
