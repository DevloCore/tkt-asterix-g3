import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/attractions.css';

function Menu() {
  const [commerces, setCommerces] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [stock, setStock] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const commercesResponse = await axios.get('commerces');
        setCommerces(commercesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

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
    <div className="container">
      <div className='d-flex justify-content-center'><h4>Boutiques</h4></div>
      <div className="commerces-list list-group">
        {commerces.map((commerce) => (
          <div className='list-group-item list-group-item-action' key={commerce.id} onClick={() => handleCommerceClick(commerce.id)}>
            {commerce.libelle}
          </div>
        ))}
      </div>

      {selectedCommerce && (
        <div className="popup mt-4">
          <div className="popup-content">
            <div className='d-flex justify-content-center'>
              <h4>Stock du commerce <span className='text-success fw-bold'>{selectedCommerce}</span></h4>
            </div>
            <div className="list-group mt-3">
              {stock.map(item => (
                <div className="list-group-item" key={item.id_produit}>
                  <strong>{item.libelleProduit}:</strong> {item.quantite}
                </div>
              ))}
            </div>
            <div className='d-flex justify-content-center mt-2'>
              <button className="btn btn-secondary" onClick={() => setSelectedCommerce(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
