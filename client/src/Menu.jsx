import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importez le fichier App.css

function Menu() {
  const [attractions, setRides] = useState([]);
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const attractionsResponse = await axios.get('attractions');
        const shopsResponse = await axios.get('attractions');
  
        // Vérifier si les réponses sont des tableaux avant de les mettre à jour
        if (Array.isArray(attractionsResponse.data) && Array.isArray(shopsResponse.data)) {
          setRides(attractionsResponse.data);
          setShops(shopsResponse.data);
        } else {
          console.error('Data received is not in expected format');
        }
  
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }
  
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="menu-container"> {/* Appliquer une classe CSS à votre conteneur principal */}
      <h2>Menu - Gestion du Parc Asterix</h2>
      <div>
        <h3>Manèges</h3>
        <ul className="attractions-list"> {/* Appliquer une classe CSS à votre liste de manèges */}
          {attractions.map((attraction) => (
            <li key={attraction.id}>{attraction.id} - {attraction.nom}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Commerces</h3>
        <ul className="shops-list"> {/* Appliquer une classe CSS à votre liste de commerces */}
          {shops.map((shop) => (
            <li key={shop.id}>{shop.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
