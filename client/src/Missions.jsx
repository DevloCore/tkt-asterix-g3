import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './assets/Missions.css';
import { UserContext } from './assets/contexts/UserContext';

const MissionTable = () => {
  const [missions, setMissions] = useState([]);
  const [metiers, setMetiers] = useState({});

  const { setLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true);

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
      finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  return (
    <div>
      <div class="someTitle missions">Missions</div>
      <table className="table table-warning table-striped mTable">
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
