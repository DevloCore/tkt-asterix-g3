import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './assets/Missions.css';
import { UserContext } from './assets/contexts/UserContext';

const AlertsTable = () => {
  const { setLoading } = useContext(UserContext);
  const [avertissements, setAvertissements] = useState([]);
  const [gravites, setGravites] = useState([]);
  const [newAvertissement, setNewAvertissement] = useState({
    motif: '',
    id_gravite: '',
    email_utilisateur: '' // Supposons que vous collectiez toujours cet info
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setGravites(gravitesResponse.data);
        setAvertissements(updatedAvertissements);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAvertissement(prev => ({ ...prev, [name]: value }));
  };

  const addAvertissement = async () => {
    setLoading(true);
    try {
      var { data } = await axios.post('/avertissements', newAvertissement);
      data = {
        ...data,
        date: new Date(data.date).toLocaleDateString('fr-FR'),
      };
      setAvertissements(prev => [...prev, data]);
      setNewAvertissement({ motif: '', id_gravite: '' });
    } catch (error) {
      console.error('Failed to add avertissement:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="someTitle avertissements">Avertissements</div>
      <div>
        <input type="text" name="motif" placeholder="Motif" value={newAvertissement.motif} onChange={handleInputChange} />
        <select name="id_gravite" value={newAvertissement.id_gravite} onChange={handleInputChange}>
          <option value="">Sélectionnez la gravité</option>
          {gravites.map(g => (
            <option key={g.id} value={g.id}>{g.libelle}</option>
          ))}
        </select>
        
        <button onClick={addAvertissement}>Ajouter</button>
      </div>
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
              <td>{gravites.find(g => g.id === avertissement.id_gravite)?.libelle}</td>
              <td>{avertissement.email_utilisateur}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;