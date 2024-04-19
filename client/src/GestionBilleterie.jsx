import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './assets/contexts/UserContext';
import Icon from '@mdi/react';
import { mdiPlus } from '@mdi/js';

const GestionBilleterie = () => {
  const { setLoading } = useContext(UserContext);
  const [billets, setBillets] = useState([]);
  const [newBillet, setNewBillet] = useState({ id: '', libelle: '', prix: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);  // State to manage form visibility

  useEffect(() => {
    fetchBillets();
  }, []);

  const fetchBillets = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/billets');
      setBillets(response.data);
    } catch (error) {
      console.error('Error fetching billets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBillet(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveBillet = async () => {
    const method = newBillet.id ? 'put' : 'post';
    const url = newBillet.id ? `/billet/${newBillet.id}` : '/billet';
    window.location.reload();
    try {
      setLoading(true);
      await axios[method](url, newBillet);
      fetchBillets();
      setNewBillet({ id: '', libelle: '', prix: '' });
      setIsFormOpen(false);  // Close the form after saving
    } catch (error) {
      console.error('Error saving billet:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBillet = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce billet ?")) {
      try {
        setLoading(true);
        await axios.delete(`/billet/${id}`);
        fetchBillets();
      } catch (error) {
        console.error('Error deleting billet:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditBillet = (billet) => {
    setNewBillet(billet);
    setIsFormOpen(true);  // Open the form when clicking on 'Modifier'
  };

  return (
    <div>
      <div className="someTitle billetterie">Gestion de la Billetterie</div>
      <div className="d-flex justify-content-center mb-2">
        <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAdd" aria-expanded={isFormOpen} aria-controls="collapseAdd" onClick={() => setIsFormOpen(!isFormOpen)}>
          <Icon path={mdiPlus} size={1} /> Afficher le formulaire de billet
        </button>
      </div>
      <div className={"collapse mb-2" + (isFormOpen ? ' show' : '')} id="collapseAdd">
        <div className="card card-body bg-light p-4">
          <h2>{newBillet.id ? 'Modifier un billet' : 'Ajouter un billet'} :</h2>
          <div className="form-group mb-3">
            <label htmlFor="libelle">Libellé:</label>
            <input type="text" className="form-control" id="libelle" name="libelle" placeholder="Libellé du billet" value={newBillet.libelle} onChange={handleInputChange} />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="prix">Prix:</label>
            <input type="number" className="form-control" id="prix" name="prix" placeholder="Prix du billet" value={newBillet.prix} onChange={handleInputChange} />
          </div>
          <button className="btn btn-primary" onClick={saveBillet}>
            {newBillet.id ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </div>

      <table className="table table-primary table-striped mTable">
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {billets.map(billet => (
            <tr key={billet.id}>
              <td>{billet.libelle}</td>
              <td>{billet.prix}€</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEditBillet(billet)}>Modifier</button>
                <button className="btn btn-danger" onClick={() => deleteBillet(billet.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionBilleterie;
