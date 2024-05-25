import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ClientDetail = () => { // Renommé le composant en ClientDetail
  const { idClient } = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    axios.get(`/api${idClient}`)
      .then(response => {
        setClient(response.data);
      })
      .catch(error => {
        console.error("Error fetching client details:", error);
      });
  }, [idClient]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Client Detail</h1> {/* Changé le titre pour refléter les détails d'un client individuel */}
      <p>ID: {client.id}</p>
      <p>Name: {client.name}</p>
      <p>Last Name: {client.lastName}</p>
      <p>Email: {client.email}</p>
    </div>
  );
};

export default ClientDetail; // Exporter le composant renommé
