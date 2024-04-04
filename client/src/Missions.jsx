import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/Missions.css';

const MissionTable = () => {
  const [missions, setMissions] = useState([]);
  const [metiers, setMetiers] = useState({});

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const missionsResponse = await axios.get('missions');
        const metiersResponse = await axios.get('metiers');

        // Convertir les dates au format souhaité
        const updatedMissions = missionsResponse.data.map(mission => ({
          ...mission,
          // Convertir la date au format 'YYYY-MM-DD'
          date: new Date(mission.date).toLocaleDateString('en-GB'),
          // Récupérer le libellé associé à l'ID du métier
          metierLibelle: metiersResponse.data.find(metier => metier.id === mission.id_metier)?.libelle || ''
        }));

        setMissions(updatedMissions);
      } catch (error) {
        console.error('Error fetching missions:', error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div>
      <div class="someTitle missions">Missions</div>
      <table className="mission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Poste Affecté</th>
            <th>Personne Affectée</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {missions.map(mission => (
            <tr key={mission.id}>
              <td>{mission.id}</td>
              <td>{mission.libelle}</td>
              <td>{mission.metierLibelle}</td>
              <td>{mission.email_utilisateur}</td>
              <td>{mission.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionTable;
