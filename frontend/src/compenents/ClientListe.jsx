import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientsList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/client');
        setClients(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error);
      }
    };

    fetchClients();
  }, []);

  const supprimerClient = (idClient) => {
    axios.delete(`http://localhost:3000/api/v1/client/${idClient}`)
      .then(response => {
        console.log('Client supprimé avec succès:', response.data.message);
        setClients(clients.filter(client => client._id !== idClient));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression du client:', error);
      });
  };

  return (
    <div>
      <h1>Liste des clients</h1>
      <ul>
        {clients.map(client => (
          <li key={client._id}>
            {client.nom} {client.prenom} - {client.email} - <button onClick={() => supprimerClient(client._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsList;
