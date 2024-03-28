import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Missions.css';

const AlertsTable = () => {
  const [avertissements, setAvertissements] = useState([]);
  const [gravites, setGravites] = useState({});

  useEffect(() => {
    const fetchAvertissements = async () => {
      try {
        const alertsResponse = await axios.get('http://localhost:3000/avertissements');
        const gravitesResponse = await axios.get('http://localhost:3000/gravites');

        // Convertir les dates au format souhaité
        const updatedAvertissements = alertsResponse.data.map(avertissement => ({
          ...avertissement,
          // Convertir la date au format 'YYYY-MM-DD'
          date: new Date(avertissement.date).toLocaleDateString('en-GB'),
          // Récupérer le libellé associé à l'ID de gravité
          graviteLibelle: gravitesResponse.data.find(gravite => gravite.id === avertissement.id_gravite)?.libelle || ''
        }));

        setAvertissements(updatedAvertissements);
      } catch (error) {
        console.error('Error fetching avertissements:', error);
      }
    };

    fetchAvertissements();
  }, []);

  return (
    <div>
      <h1>Avertissements :</h1>
      <table className="mission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Motif</th>
            <th>Gravité</th>
            <th>Qui a signalé ?</th>
          </tr>
        </thead>
        <tbody>
          {avertissements.map(avertissement => (
            <tr key={avertissement.id}>
              <td>{avertissement.id}</td>
              <td>{avertissement.date}</td>
              <td>{avertissement.motif}</td>
              <td>{avertissement.graviteLibelle}</td>
              <td>{avertissement.email_utilisateur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;