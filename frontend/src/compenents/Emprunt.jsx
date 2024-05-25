import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientEmprunts({ idClient }) {
  const [emprunts, setEmprunts] = useState([]);

  useEffect(() => {
    const fetchEmprunts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/emprunt/${idClient}`);
        setEmprunts(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des emprunts du client :', error);
      }
    };
  
    fetchEmprunts();
  }, [idClient]);

  return (
    <div>
      <h1>Emprunts du client {idClient}</h1>
      <ul>
        {emprunts.map(emprunt => (
          <li key={emprunt._id}>{emprunt.livre} - {emprunt.dateEmprunt}</li>
        ))}
      </ul>
    </div>
  );
}

export default ClientEmprunts;
