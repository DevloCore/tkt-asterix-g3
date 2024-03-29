import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Missions.css';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [equipes, setEquipes] = useState([]);
  const [metiers, setMetiers] = useState([]);
  const [newUser, setNewUser] = useState({
    email: '',
    nom: '',
    prenom: '',
    id_equipe: '',
    id_metier: '',
    password: ''
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, equipesResponse, metiersResponse] = await Promise.all([
          axios.get('users'),
          axios.get('equipes'),
          axios.get('metiers')
        ]);

        setUsers(usersResponse.data);
        setEquipes(equipesResponse.data);
        setMetiers(metiersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const addUser = async () => {
    try {
      await axios.post('adduser', newUser);
      setUsers([...users, newUser]);
      setNewUser({
        email: '',
        nom: '',
        prenom: '',
        id_equipe: '',
        id_metier: '',
        password: ''
      });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (userId) => {
    if(window.confirm("Voulez vous vraiment supprimer l'utilisateur "+userId)) {
      try {
        await axios.delete(`deleteuser/${userId}`);
        setUsers(users.filter(user => user.email !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const updateUser = async (userId, updatedUserInfo) => {
    try {
      await axios.put(`edituser/${userId}`, updatedUserInfo);
      setUsers(users.map(user => {
        if (user.email === userId) {
          return { ...user, ...updatedUserInfo };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  
  const handleEditClick = (userId) => {
    setEditingUser(userId);
  };
  
  const handleConfirmEdit = async (userId) => {
    try {
      const updatedUser = {
        email: newUser.email,
        nom: newUser.nom,
        prenom: newUser.prenom,
        id_equipe: newUser.id_equipe,
        id_metier: newUser.id_metier,
        password: newUser.password
      };
      await updateUser(userId, updatedUser);
      setEditingUser(null);
    } catch (error) {
      console.error('Error confirming edit:', error);
    }
  };

  return (
    <div>
      <h1>Utilisateurs :</h1>
      <div>
        <h2>Ajouter un utilisateur :</h2>
        <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
        <input type="text" name="nom" placeholder="Nom" value={newUser.nom} onChange={handleInputChange} />
        <input type="text" name="prenom" placeholder="Prénom" value={newUser.prenom} onChange={handleInputChange} />
        <select name="id_equipe" value={newUser.id_equipe} onChange={handleInputChange}>
          <option value="">Sélectionnez une équipe</option>
          {equipes.map(equipe => (
            <option key={equipe.id} value={equipe.id}>{equipe.libelle}</option>
          ))}
        </select>
        <select name="id_metier" value={newUser.id_metier} onChange={handleInputChange}>
          <option value="">Sélectionnez un métier</option>
          {metiers.map(metier => (
            <option key={metier.id} value={metier.id}>{metier.libelle}</option>
          ))}
        </select>
        <input type="password" name="password" placeholder="Mot de passe" value={newUser.password} onChange={handleInputChange} />
        <button onClick={addUser}>Ajouter</button>
      </div>
      <table className="mission-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Équipe</th>
            <th>Métier</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{editingUser === user.email ? <input type="text" value={user.email} onChange={e => updateUser(user.email, { email: e.target.value })} /> : user.email}</td>
              <td>{editingUser === user.email ? <input type="text" value={user.nom} onChange={e => updateUser(user.email, { nom: e.target.value })} /> : user.nom}</td>
              <td>{editingUser === user.email ? <input type="text" value={user.prenom} onChange={e => updateUser(user.email, { prenom: e.target.value })} /> : user.prenom}</td>
              <td>{editingUser === user.email ? <select value={user.id_equipe} onChange={e => updateUser(user.email, { id_equipe: e.target.value })}>
                <option value="">Sélectionnez une équipe</option>
                {equipes.map(equipe => (
                  <option key={equipe.id} value={equipe.id}>{equipe.libelle}</option>
                ))}
              </select> : equipes.find(equipe => equipe.id === user.id_equipe)?.libelle}</td>
              <td>{editingUser === user.email ? <select value={user.id_metier} onChange={e => updateUser(user.email, { id_metier: e.target.value })}>
                <option value="">Sélectionnez un métier</option>
                {metiers.map(metier => (
                  <option key={metier.id} value={metier.id}>{metier.libelle}</option>
                ))}
              </select> : metiers.find(metier => metier.id === user.id_metier)?.libelle}</td>
              <td>
                {editingUser === user.email ? (
                  <>
                    <button onClick={() => handleConfirmEdit(user.email)}>Confirmer</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(user.email)}>Modifier</button>
                )}
                <button onClick={() => deleteUser(user.email)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
