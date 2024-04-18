import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/Missions.css';
import { useContext } from 'react';
import { UserContext } from './assets/contexts/UserContext';

const MissionsTable = () => {
  const { setLoading } = useContext(UserContext);

  const [missions, setMissions] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [metiers, setMetiers] = useState([]);
  const [statutsMission, setStatutsMission] = useState([]);
  const [commerces, setCommerces] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [newMission, setNewMission] = useState({
    libelle: '',
    date: '',
    email_utilisateur: '',
    id_statut_mission: 1, // Valeur par défaut de statut
    id_commerce: '',
    id_attraction: '',
    commentaire: '',
    id_metier: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [missionsResponse, utilisateursResponse, equipesResponse, metiersResponse, statutsMissionResponse, commercesResponse, attractionsResponse] = await Promise.all([
          axios.get('missions'),
          axios.get('users'),
          axios.get('equipes'),
          axios.get('metiers'),
          axios.get('missions/statuts'),
          axios.get('commerces'),
          axios.get('attractions')
        ]);

        setMissions(missionsResponse.data);
        setUtilisateurs(utilisateursResponse.data);
        setEquipes(equipesResponse.data);
        setMetiers(metiersResponse.data);
        setStatutsMission(statutsMissionResponse.data);
        setCommerces(commercesResponse.data);
        setAttractions(attractionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMission(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addMission = async () => {
    try {
      setLoading(true);

      await axios.post('addmission', newMission);
      setNewMission({
        libelle: '',
        date: '',
        email_utilisateur: '',
        id_statut_mission: 1,
        id_commerce: '',
        id_attraction: '',
        commentaire: '',
        id_metier: ''
      });
      refreshData();
    } catch (error) {
      console.error('Error adding mission:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const updateMission = async () => {
    try {
      setLoading(true);

      await axios.patch(`/editmission/${newMission.id}`, newMission);
      refreshData();
    } catch (error) {
      console.error('Error updating mission:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteMission = async (missionId) => {
    if(window.confirm("Voulez-vous vraiment supprimer la mission avec l'ID "+ missionId + " ?")) {
      try {
        setLoading(true);

        await axios.delete(`/deletemission/${missionId}`);
        refreshData();
      } catch (error) {
        console.error('Error deleting mission:', error);
      }
      finally {
        setLoading(false);
      }
    }
  };

  const refreshData = async () => {
    try {
      setLoading(true);

      const [missionsResponse, utilisateursResponse, equipesResponse, metiersResponse, statutsMissionResponse, commercesResponse, attractionsResponse] = await Promise.all([
        axios.get('missions'),
        axios.get('users'),
        axios.get('equipes'),
        axios.get('metiers'),
        axios.get('missions/statuts'),
        axios.get('commerces'),
        axios.get('attractions')
      ]);

      setMissions(missionsResponse.data);
      setUtilisateurs(utilisateursResponse.data);
      setEquipes(equipesResponse.data);
      setMetiers(metiersResponse.data);
      setStatutsMission(statutsMissionResponse.data);
      setCommerces(commercesResponse.data);
      setAttractions(attractionsResponse.data);
    } catch (error) {
      console.error('Error refreshing data:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const getLibelleFromId = (id, data) => {
    const item = data.find(item => item.id === id);
    return item ? item.libelle : '';
  };

  const getNomFromId = (id, data) => {
    const item = data.find(item => item.id === id);
    return item ? item.nom : '';
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleEditMission = (mission) => {
    setNewMission(mission);
  };

  return (
    <div>
      <div className="someTitle admin">Gestion des Missions</div>
      <div>
        <h2>Ajouter une mission :</h2>
        <input 
          type="text" 
          name="libelle" 
          placeholder="Libellé" 
          value={newMission.libelle} 
          onChange={handleInputChange} 
        />
        <input 
          type="date" 
          name="date" 
          value={newMission.date} 
          onChange={handleInputChange} 
        />
        <select 
          name="id_commerce" 
          value={newMission.id_commerce} 
          onChange={handleInputChange} 
        >
          <option value="">Sélectionnez un commerce</option>
          {commerces.map(commerce => (
            <option key={commerce.id} value={commerce.id}>{commerce.libelle}</option>
          ))}
        </select>
        <select 
          name="id_attraction" 
          value={newMission.id_attraction} 
          onChange={handleInputChange} 
        >
          <option value="">Sélectionnez une attraction</option>
          {attractions.map(attraction => (
            <option key={attraction.id} value={attraction.id}>{attraction.nom}</option>
          ))}
        </select>
        <input 
          type="text" 
          name="commentaire" 
          placeholder="Commentaire" 
          value={newMission.commentaire} 
          onChange={handleInputChange} 
        />
        <select 
          name="id_metier" 
          value={newMission.id_metier} 
          onChange={handleInputChange} 
        >
          <option value="">Sélectionnez un métier</option>
          {metiers.map(metier => (
            <option key={metier.id} value={metier.id}>{metier.libelle}</option>
          ))}
        </select>
        <button onClick={newMission.id ? updateMission : addMission}>
          {newMission.id ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
      <table className="mission-table">
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Date</th>
            <th>Email de l'utilisateur</th>
            <th>Statut</th>
            <th>Commerce</th>
            <th>Attraction</th>
            <th>Commentaire</th>
            <th>Métier</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {missions.map(mission => (
            <tr key={mission.id}>
              <td>{mission.libelle}</td>
              <td>{formatDate(mission.date)}</td>
              <td>{mission.email_utilisateur}</td>
              <td>{getLibelleFromId(mission.id_statut_mission, statutsMission)}</td>
              <td>{getLibelleFromId(mission.id_commerce, commerces)}</td>
              <td>{getNomFromId(mission.id_attraction, attractions)}</td>
              <td>{mission.commentaire}</td>
              <td>{getLibelleFromId(mission.id_metier, metiers)}</td>
              <td>
                <button onClick={() => deleteMission(mission.id)}>Supprimer</button>
                <button onClick={() => handleEditMission(mission)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};  

export default MissionsTable;
