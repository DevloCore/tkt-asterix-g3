import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importez le fichier App.css

function Menu() {
  const [attractions, setAttractions] = useState([]);
  const [commerces, setCommerces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [stock, setStock] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const attractionsResponse = await axios.get('attractions');
        const attractionsWithImages = await Promise.all(attractionsResponse.data.map(async attraction => {
          const imagesResponse = await axios.get(`attraction/${attraction.id}/images`);
          return { ...attraction, images: imagesResponse.data };
        }));
        const commercesResponse = await axios.get('commerces');
  
        // Vérifier si les réponses sont des tableaux avant de les mettre à jour
        if (Array.isArray(attractionsResponse.data) && Array.isArray(commercesResponse.data)) {
          setAttractions(attractionsWithImages);
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
              {attraction.images && (
                <div>
                  <h4>Images :</h4>
                  <ul>
                    {attraction.images.map((image, index) => (
                      <li key={index}>
                        <img src={image.lien} alt={`Image ${index + 1}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Commerces :</h3>
        <ul className="commerces-list"> {/* Appliquer une classe CSS à votre liste de commerces */}
          {commerces.map((commerce) => (
            <li key={commerce.id} onClick={() => handleCommerceClick(commerce.id)}>
              {commerce.id} - {commerce.libelle}
            </li>
          ))}
        </ul>
      </div>

      {/* Affichage du stock dans un pop-up */}
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
