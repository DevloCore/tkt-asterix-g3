import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './assets/attractions.css';
import Icon from '@mdi/react';
import { mdiHumanMaleHeightVariant, mdiHumanMaleChild, mdiArrowDownDropCircle, mdiCompassRose, mdiFilter } from '@mdi/js';
// import { UserContext } from './assets/contexts/UserContext';

function Menu() {
  const [attractions, setAttractions] = useState([]);
  const [hasFilter, setHasFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [themes, setThemes] = useState([]);
  const [commerces, setCommerces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [stock, setStock] = useState(null);

  const [taille, setTaille] = useState(160);
  const handleTailleChange = (event) => {
    setTaille(event.target.value);
  };

  // const userCon = useContext(UserContext);

  useEffect(() => {
    // console.log(userCon.user);

    async function fetchData() {
      try {
        const attractionsResponse = await axios.get('attractions');
        const attractionsWithImages = await Promise.all(attractionsResponse.data.map(async attraction => {
          const imagesResponse = await axios.get(`attraction/${attraction.id}/images`);
          return { ...attraction, images: imagesResponse.data };
        }));
        const themesReponse = await axios.get('attractions/themes');
        const commercesResponse = await axios.get('commerces');

        // Vérifier si les réponses sont des tableaux avant de les mettre à jour
        if (Array.isArray(attractionsResponse.data)) {
          setAttractions(attractionsWithImages);
          setCommerces(commercesResponse.data);
          setThemes(themesReponse.data);
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

  async function filterAttractions(event) {
    event.preventDefault()
    const theme = event.currentTarget.elements.themeSelect.value;
    const estAccompagne = event.currentTarget.elements.estAccompagne.checked;

    try {
      const response = await axios.get('filterAttractions', {
        params: {
          theme: theme,
          taille: taille,
          estAccompagne: estAccompagne
        }
      });
      setFilters(response.data);
      setHasFilter(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

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
    <div className='container' style={{ maxWidth: "768px" }}>
      <div className="someTitle attractions">Liste des attractions</div>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#searchCollapse" aria-expanded="false" aria-controls="collapseExample">
          <Icon path={mdiFilter} size={1} className="me-2"/>
          Filtrer
        </button>
      </div>
      <div className="collapse mb-3" id="searchCollapse">
        <div className="card card-body bg-success text-light">
          <form onSubmit={filterAttractions}>
            <div className="mb-3">
              <label htmlFor="themeSelect" className="form-label">Thème :</label>
              <select className="form-select" id="themeSelect">
                <option value="-1">Choisir un thème...</option>
                {themes.map(theme => (
                  <option value={theme.id} key={theme.id}>{theme.libelle}</option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              {/* slider pour choisir une taille en cm */}
              <label htmlFor="tailleMin" className="form-label">Votre taille : <b>{taille} cm</b></label>
              <input type="range" className="form-range custom-range" id="tailleMin" min="50" max="200" step="1" onChange={handleTailleChange} value={taille}/>
            </div>
            <div className="mb-3">
              <input type="checkbox" id="estAccompagne" className="form-check-input" />
              <label htmlFor="estAccompagne" className="form-label ms-2">Accompagné d'un adulte</label>
            </div>
            <button type="submit" className="btn btn-primary">Filtrer</button>
          </form>
        </div>
      </div>
      <div className="row">
      {attractions.filter(attraction => !hasFilter || filters.includes(attraction.id)).map((attraction, index) => (
          <div className="col-12 col-md-6 mt-2" key={index}>
            <div className="card mb-3 shadow" key={attraction.id}>
              {attraction.images.length > 0 && (
                <>
                  <div id={`carousel${index}`} className="carousel slide pointer-event">
                    <div className="carousel-inner">
                      {attraction.images.map((image, index) => (
                        <div className={`carousel-item ${index == 0 ? 'active' : ''}`} key={index}>
                          <img src={image.lien} className="d-block w-100 card-img-top" alt={image.nom} style={{ maxHeight: '256px', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                    {attraction.images.length > 1 && (
                      <div>
                        <button className="carousel-control-prev" type="button" data-bs-target={`#carousel${index}`} data-bs-slide="prev">
                          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target={`#carousel${index}`} data-bs-slide="next">
                          <span className="carousel-control-next-icon" aria-hidden="true"></span>
                          <span className="visually-hidden">Next</span>
                        </button>
                      </div>
                      )}
                  </div>
                </>
              )}
              <div className="card-body">
                <h5 className="card-title">
                  <div className="d-flex justify-content-between align-items-start">
                    {attraction.nom}
                    <button className="btn btn-sm" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls="collapseExample">
                      <Icon path={mdiArrowDownDropCircle} size={1} color="darkcyan"/>
                    </button>
                  </div>
                </h5>
                <div className="card-text">
                  <div className="collapse" id={`collapse${index}`}>
                    <div className="card card-body">
                      <p>{attraction.description}</p>
                      <small className="text-body-secondary">
                        {attraction.taille_min && <div><Icon path={mdiHumanMaleHeightVariant} size={1} style={{ marginRight: '8px' }} /><em>Taille minimale :</em> {attraction.taille_min} cm</div>}
                        {attraction.taille_min_acc && <div><Icon path={mdiHumanMaleChild} size={1} style={{ marginRight: '8px' }} /><em>Taille minimale accompagnée :</em> {attraction.taille_min_acc} cm</div>}
                      </small>
                    </div>
                  </div>
                </div>
                <h4><span className="position-absolute top-0 start-100 translate-middle badge rounded-pill attractionNum">{attraction.numero}</span></h4>
                <p className="card-text">
                  <small className="text-body-secondary">
                    {attraction.taille_min && <span><Icon path={mdiCompassRose} size={1.2} style={{ marginRight: '8px' }} />{themes.find(theme => theme.id == attraction.id_theme).libelle}</span>}
                  </small>
                </p>
              </div>
            </div>
          </div>
        ))}

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
