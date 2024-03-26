import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assurez-vous d'installer axios : npm install axios ou yarn add axios
import './App.css'; // Importez le fichier App.css

function Menu() {
  const [attractions, setAttractions] = useState([]);
  const [commerces, setCommerces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const attractionsResponse = await axios.get('http://localhost:3000/attractions');
        const commercesResponse = await axios.get('http://localhost:3000/commerces');
  
        // Vérifier si les réponses sont des tableaux avant de les mettre à jour
        if (Array.isArray(attractionsResponse.data) && Array.isArray(commercesResponse.data)) {
          setAttractions(attractionsResponse.data);
          setCommerces(commercesResponse.data);
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
  <h3>Attractions :</h3>
  <ul className="attractions-list"> {/* Appliquer une classe CSS à votre liste de manèges */}
    {attractions.map((attraction) => (
      <li key={attraction.id}>
        <strong>{attraction.nom}</strong>
        {attraction.description && <p><em>Description :</em> {attraction.description}</p>}
        {attraction.taille_min && <p><em>Taille minimale :</em> {attraction.taille_min}</p>}
        {attraction.taille_min_acc && <p><em>Taille minimale accompagnée :</em> {attraction.taille_min_acc}</p>}
      </li>
    ))}
  </ul>
</div>

      <div>
        <h3>Commerces :</h3>
        <ul className="commerces-list"> {/* Appliquer une classe CSS à votre liste de commerces */}
          {commerces.map((commerce) => (
            <li key={commerce.id}>{commerce.id} - {commerce.libelle}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
