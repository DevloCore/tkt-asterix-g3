import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './assets/attractions.css';
import Icon from '@mdi/react';
import { mdiHumanMaleHeightVariant, mdiHumanMaleChild, mdiArrowDownDropCircle, mdiCompassRose, mdiFilter } from '@mdi/js';
import { UserContext } from './assets/contexts/UserContext';

function Menu() {
  const [commerces, setCommerces] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [stock, setStock] = useState(null);

  const { setLoading } = useContext(UserContext);

  useEffect(() => {
    // console.log(userCon.user);

    async function fetchData() {
      try {
        setLoading(true);

        const commercesResponse = await axios.get('commerces');
        setCommerces(commercesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Fonction pour récupérer le stock d'un commerce spécifique
  const fetchStock = async (idCommerce) => {
    try {
      const response = await axios.get(`commerces/${idCommerce}/produits`);
      setStock(response.data);
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  const handleCommerceClick = (idCommerce) => {
    setSelectedCommerce(idCommerce);
    fetchStock(idCommerce);
  };

    return (
      <div> {/* Wrapper div for the entire component */}
        <div>
          <h3>Boutiques :</h3>
          <ul className="commerces-list">
            {commerces.map((commerce) => (
              <li key={commerce.id} onClick={() => handleCommerceClick(commerce.id)}>
                {commerce.id} - {commerce.libelle}
              </li>
            ))}
          </ul>
        </div>
  
        {selectedCommerce && (
          <div className="popup">
            <div className="popup-content">
              <h3>Stock restant pour le commerce {selectedCommerce} :</h3>
              <ul>
                {stock && stock.map(item => (
                  <li key={item.id_produit}>{item.libelleProduit}: {item.quantite}</li>
                ))}
              </ul>
              <button onClick={() => setSelectedCommerce(null)}>Fermer</button>
            </div>
          </div>
        )}
      </div>
    );
  }
  

export default Menu;
