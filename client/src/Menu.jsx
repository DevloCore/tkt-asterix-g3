import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiHumanMaleHeightVariant, mdiHumanMaleChild } from '@mdi/js';

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
    <div className='container' style={{ maxWidth:"720px"}}>
      <h2 style={{ textAlign: 'center' }} className='mb-4'>Liste des attractions</h2>
      {attractions.map((attraction) => (
        <div className="card mb-3 shadow" key={attraction.id}>
          {attraction.images.length > 0 && (
            <>
              <div id="carouselExample" class="carousel slide">
                <div class="carousel-inner">
                  {attraction.images.map((image, index) => (
                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                      <img src={image.lien} className="d-block w-100 card-img-top" alt={image.nom} style={{ maxHeight: '256px', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </>
          )}
          <div class="card-body">
            <h5 class="card-title">{attraction.nom}</h5>
            <p class="card-text">{attraction.description}</p>
            <p class="card-text">
              <small class="text-body-secondary">
                {attraction.taille_min && <div><Icon path={mdiHumanMaleHeightVariant} size={1.2} style={{ marginRight: '8px' }} /><em>Taille minimale :</em> {attraction.taille_min}</div>}
                {attraction.taille_min_acc && <div><Icon path={mdiHumanMaleChild} size={1.2} style={{ marginRight: '8px' }} /><em>Taille minimale accompagnée :</em> {attraction.taille_min_acc}</div>}
              </small>
            </p>
          </div>
        </div>
      ))}

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
