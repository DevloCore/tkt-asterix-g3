import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './assets/Missions.css';
import { UserContext } from './assets/contexts/UserContext';

const AlertsTable = () => {
  const [avertissements, setAvertissements] = useState([]);
  const [gravites, setGravites] = useState({});

  const { setLoading } = useContext(UserContext);

  useEffect(() => {
    const fetchAvertissements = async () => {
      try {
        setLoading(true);

        const alertsResponse = await axios.get('avertissements');
        const gravitesResponse = await axios.get('gravites');

        // Convertir les dates au format souhaité
        const updatedAvertissements = alertsResponse.data.map(avertissement => ({
          ...avertissement,
          // Convertir la date au format 'YYYY-MM-DD'
          date: new Date(avertissement.date).toLocaleDateString('fr-FR'),
          // Récupérer le libellé associé à l'ID de gravité
          graviteLibelle: gravitesResponse.data.find(gravite => gravite.id === avertissement.id_gravite)?.libelle || ''
        }));

        setAvertissements(updatedAvertissements);
      } catch (error) {
        console.error('Error fetching avertissements:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchAvertissements();
  }, []);

  return (
    <div>
      <div class="someTitle avertissements">Avertissements</div>
      <table className="table table-danger table-striped mTable">
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