import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './assets/contexts/UserContext';

const Billetterie = () => {
  const { setLoading } = useContext(UserContext);
  const [billets, setBillets] = useState([]);

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

  return (
    <div>
      <div className="someTitle billetterie">Billetterie</div>
      <table className="table table-primary table-striped mTable">
        <thead>
          <tr>
            <th>Type Billet</th>
            <th>Prix</th>
          </tr>
        </thead>
        <tbody>
          {billets.map(billet => (
            <tr key={billet.id}>
              <td>{billet.libelle}</td>
              <td>{billet.prix}€</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Billetterie;