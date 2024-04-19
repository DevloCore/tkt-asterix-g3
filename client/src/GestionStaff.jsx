import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './assets/Missions.css';
import { UserContext } from './assets/contexts/UserContext';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

const UsersTable = () => {
  const { setLoading } = useContext(UserContext);

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
        setLoading(true);

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
      finally {
        setLoading(false);
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
      setLoading(true);

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
      window.location.reload();
    } catch (error) {
      console.error('Error adding user:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Voulez vous vraiment supprimer l'utilisateur " + userId + " ?")) {
      try {
        setLoading(true);

        await axios.delete(`deleteuser/${userId}`);
        setUsers(users.filter(user => user.email !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
      finally {
        setLoading(false);
      }
    }
  };

  const updateUser = async (email, updatedUserInfo) => {
    try {
      setLoading(true);

      await axios.patch(`/edituser/${email}`, updatedUserInfo);
      setUsers(users.map(user => {
        if (user.email === email) {
          return { ...user, ...updatedUserInfo };
        }
        return user;
      }));
    } catch (error) {
      console.error('Error updating user:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleEditClick = (userId) => {
    document.getElementById('collapseAdd').classList.remove('show');
    document.getElementById('expandForm').classList.add("importantHide");
    // Récupérer les informations de l'utilisateur sélectionné
    const selectedUser = users.find(user => user.email === userId);
    if (selectedUser) {
      // Mettre à jour newUser avec les informations de l'utilisateur sélectionné
      setNewUser(selectedUser);
      setEditingUser(userId);
    }
  };

  const handleConfirmEdit = async (email) => {
    try {
      setLoading(true);

      const updatedUser = {
        email: newUser.email,
        nom: newUser.nom,
        prenom: newUser.prenom,
        id_equipe: newUser.id_equipe,
        id_metier: newUser.id_metier,
        password: newUser.password
      };
      await updateUser(email, updatedUser);
      setEditingUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Error confirming edit:', error);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="someTitle admin">Gestion du Staff</div>

      <div className="d-flex justify-content-center mb-2" id="expandForm">
        <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseAdd`} aria-expanded="false" aria-controls="collapseExample">
          <Icon path={mdiPlus} size={1} /> Afficher le formulaire de gestion
        </button>
      </div>

      <div className="collapse mb-2" id='collapseAdd'>
        <div className="card card-body bg-light p-4">
          <h2>Ajouter un utilisateur :</h2>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="nom"
              placeholder="Nom"
              value={newUser.nom}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              name="prenom"
              placeholder="Prénom"
              value={newUser.prenom}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group mb-3">
            <select
              className="form-select"
              name="id_equipe"
              value={newUser.id_equipe}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez une équipe</option>
              {equipes.map(equipe => (
                <option key={equipe.id} value={equipe.id}>{equipe.libelle}</option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <select
              className="form-select"
              name="id_metier"
              value={newUser.id_metier}
              onChange={handleInputChange}
            >
              <option value="">Sélectionnez un métier</option>
              {metiers.map(metier => (
                <option key={metier.id} value={metier.id}>{metier.libelle}</option>
              ))}
            </select>
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Mot de passe"
              value={newUser.password}
              onChange={handleInputChange}
            />
          </div>
          <button className="btn btn-primary" onClick={addUser}>Ajouter</button>
        </div>
      </div>
      <table className="table table-primary table-striped mTable">
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
              <td>
                {editingUser === user.email ? (
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.email}
                      style={{ maxWidth: '128px' }}
                      onChange={e => setNewUser(prevState => ({ ...prevState, email: e.target.value }))}
                    />
                  </div>
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user.email ? (
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.nom}
                      style={{ maxWidth: '92px' }}
                      onChange={e => setNewUser(prevState => ({ ...prevState, nom: e.target.value }))}
                    />
                  </div>
                ) : (
                  user.nom
                )}
              </td>
              <td>
                {editingUser === user.email ? (
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={newUser.prenom}
                      style={{ maxWidth: '92px' }}
                      onChange={e => setNewUser(prevState => ({ ...prevState, prenom: e.target.value }))}
                    />
                  </div>
                ) : (
                  user.prenom
                )}
              </td>
              <td>
                {editingUser === user.email ? (
                  <div className="input-group mb-3">
                    <select
                      className="form-select"
                      value={newUser.id_equipe}
                      style={{ maxWidth: '128px' }}
                      onChange={e => setNewUser(prevState => ({ ...prevState, id_equipe: e.target.value }))}
                    >
                      <option value="">Sélectionnez une équipe</option>
                      {equipes.map(equipe => (
                        <option key={equipe.id} value={equipe.id}>{equipe.libelle}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  equipes.find(equipe => equipe.id === user.id_equipe)?.libelle
                )}
              </td>
              <td>
                {editingUser === user.email ? (
                  <div className="input-group mb-3">
                    <select
                      className="form-select"
                      value={newUser.id_metier}
                      style={{ maxWidth: '128px' }}
                      onChange={e => setNewUser(prevState => ({ ...prevState, id_metier: e.target.value }))}
                    >
                      <option value="">Sélectionnez un métier</option>
                      {metiers.map(metier => (
                        <option key={metier.id} value={metier.id}>{metier.libelle}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  metiers.find(metier => metier.id === user.id_metier)?.libelle
                )}
              </td>
              <td>
                {/* Vérifier si l'utilisateur est administrateur */}
                {user.isAdmin !== 1 && (
                  <>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.email)}>Supprimer</button>
                  </>
                )}
                {editingUser === user.email ? (
                  <button className="btn btn-success" onClick={() => handleConfirmEdit(user.email)}>Confirmer</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleEditClick(user.email)}>Modifier</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
