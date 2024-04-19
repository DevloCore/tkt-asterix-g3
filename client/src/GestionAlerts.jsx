import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './assets/Missions.css';
import { UserContext } from './assets/contexts/UserContext';

const AlertsTable = () => {
  const { setLoading } = useContext(UserContext);
  const [avertissements, setAvertissements] = useState([]);
  const [gravites, setGravites] = useState([]);
  const [editAvertissement, setEditAvertissement] = useState(null);

  const {user} = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [alertsResponse, gravitesResponse] = await Promise.all([
          axios.get('/avertissements'),
          axios.get('/gravites')
        ]);
        setAvertissements(alertsResponse.data);
        setGravites(gravitesResponse.data);
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
    setEditAvertissement(prev => ({ ...prev, [name]: value }));
  };

  const saveAvertissement = async () => {
    const method = editAvertissement.id ? 'put' : 'post';
    const url = editAvertissement.id ? `/avertissements/${editAvertissement.id}` : '/avertissements';
    setLoading(true);
    try {
      const { data } = await axios[method](url, editAvertissement);
      if (editAvertissement.id) {
        setAvertissements(prev => prev.map(a => a.id === data.id ? data : a));
      } else {
        setAvertissements(prev => [...prev, data]);
      }
      setEditAvertissement(null);
    } catch (error) {
      console.error('Failed to save avertissement:', error);
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (avertissement) => {
    setEditAvertissement({ ...avertissement });
  };

  const cancelEdit = () => {
    setEditAvertissement(null);
  };

  const deleteAvertissement = async (id) => {
    if (window.confirm("Confirmez-vous la suppression de cet avertissement ?")) {
      setLoading(true);
      try {
        await axios.delete(`/avertissements/${id}`);
        setAvertissements(prev => prev.filter(a => a.id !== id));
      } catch (error) {
        console.error('Failed to delete avertissement:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="someTitle avertissements">Gestion des Avertissements</div>
      {editAvertissement ? (
        <div>
          <input type="text" name="motif" value={editAvertissement.motif} onChange={handleInputChange} />
          <select name="id_gravite" value={editAvertissement.id_gravite} onChange={handleInputChange}>
            {gravites.map(g => (
              <option key={g.id} value={g.id}>{g.libelle}</option>
            ))}
          </select>
          
          <button onClick={saveAvertissement}>Save</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => startEdit({ motif: '', id_gravite: '' })}>Add New</button>
      )}
      <table className="mission-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Motif</th>
            <th>Gravité</th>
            <th>Qui a signalé ?</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => startEdit(avertissement)}>Edit</button>
                <button onClick={() => deleteAvertissement(avertissement.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlertsTable;
