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
    id: '',
    libelle: '',
    date: '',
    email_utilisateur: '',
    id_statut_mission: '',
    id_commerce: '',
    id_attraction: '',
    commentaire: '',
    id_metier: ''
  });
  const [filteredUsers, setFilteredUsers] = useState([]);

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
    if (name === 'id_metier') {
      filterUsersByMetier(value);
    }
  };

  const filterUsersByMetier = (metierId) => {
    const filtered = utilisateurs.filter(user => user.id_metier === metierId);
    setFilteredUsers(filtered);
  };

  const addOrUpdateMission = async () => {
    const method = newMission.id ? 'patch' : 'post';
    const url = newMission.id ? `/editmission/${newMission.id}` : 'addmission';

    try {
      await axios[method](url, newMission);
      refreshData();
      setLoading(true);

      await axios.post('addmission', newMission);
      setNewMission({
        libelle: '',
        date: '',
        email_utilisateur: '',
        id_statut_mission: '',
        id_commerce: '',
        id_attraction: '',
        commentaire: '',
        id_metier: ''
      });
    } catch (error) {
      console.error('Error adding/updating mission:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const updateMission = async () => {
    try {
      await axios.patch(`/editmission/${newMission.id}`, newMission);
      refreshData();
    } catch (error) {
      console.error('Error updating mission:', error);
    }
  };

  const deleteMission = async (missionId) => {
    if(window.confirm("Voulez-vous vraiment supprimer cette mission ?")) {
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

  const handleEditMission = (mission) => {
    setNewMission(mission);
    if (mission.id_metier) {
      filterUsersByMetier(mission.id_metier);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div>
      <div className="someTitle admin">Gestion des Missions</div>
      <div>
        <h2>{newMission.id ? 'Modifier une mission' : 'Ajouter une mission'} :</h2>
        <input type="text" name="libelle" placeholder="Libellé" value={newMission.libelle} onChange={handleInputChange} />
        <input type="date" name="date" value={newMission.date} onChange={handleInputChange} />
        <select name="id_statut_mission" value={newMission.id_statut_mission} onChange={handleInputChange}>
          <option value="">Sélectionnez un statut</option>
          {statutsMission.map(statut => (
            <option key={statut.id} value={statut.id}>{statut.libelle}</option>
          ))}
        </select>
        <select name="id_commerce" value={newMission.id_commerce} onChange={handleInputChange}>
          <option value="">Sélectionnez un commerce</option>
          {commerces.map(commerce => (
            <option key={commerce.id} value={commerce.id}>{commerce.libelle}</option>
          ))}
        </select>
        <select name="id_attraction" value={newMission.id_attraction} onChange={handleInputChange}>
          <option value="">Sélectionnez une attraction</option>
          {attractions.map(attraction => (
            <option key={attraction.id} value={attraction.id}>{attraction.nom}</option>
          ))}
        </select>
        <select name="id_metier" value={newMission.id_metier} onChange={handleInputChange}>
          <option value="">Sélectionnez un métier</option>
          {metiers.map(metier => (
            <option key={metier.id} value={metier.id}>{metier.libelle}</option>
          ))}
        </select>
        <select name="email_utilisateur" value={newMission.email_utilisateur} onChange={handleInputChange}>
          <option value="">Sélectionnez un email</option>
          {filteredUsers.map(user => (
            <option key={user.id} value={user.email}>{user.email}</option>
          ))}
        </select>
        <input type="text" name="commentaire" placeholder="Commentaire" value={newMission.commentaire} onChange={handleInputChange} />
        <button onClick={addOrUpdateMission}>
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
              <td>{mission.id_statut_mission ? statutsMission.find(statut => statut.id === mission.id_statut_mission)?.libelle : ''}</td>
              <td>{mission.id_commerce ? commerces.find(commerce => commerce.id === mission.id_commerce)?.libelle : ''}</td>
              <td>{mission.id_attraction ? attractions.find(attraction => attraction.id === mission.id_attraction)?.nom : ''}</td>
              <td>{mission.commentaire}</td>
              <td>{mission.id_metier ? metiers.find(metier => metier.id === mission.id_metier)?.libelle : ''}</td>
              <td>
                <button onClick={() => handleEditMission(mission)}>Modifier</button>
                <button onClick={() => deleteMission(mission.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissionsTable;
