import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/attractions.css';

function Menu() {
  const [commerces, setCommerces] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [stock, setStock] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState(0); 

  useEffect(() => {
    async function fetchData() {
      try {
        const [commercesResponse, productsResponse] = await Promise.all([
          axios.get('commerces'),
          axios.get('produits')
        ]);
        setCommerces(commercesResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const fetchStock = async (idCommerce) => {
    try {
      const response = await axios.get(`commerces/${idCommerce}/produits`);
      setStock(response.data); // Assurez-vous que les données sont correctement récupérées
      console.log("Stock data:", response.data); // Ajouter un log pour le débogage
    } catch (error) {
      console.error('Error fetching stock:', error);
    }
  };

  const handleCommerceClick = (idCommerce) => {
    setSelectedCommerce(idCommerce);
    fetchStock(idCommerce);
  };

  const updateProductQuantity = async (productId, quantity) => {
    try {
      await axios.put(`commerces/${selectedCommerce}/produits/${productId}`, { quantite: quantity });
      alert('Stock updated successfully!');
      fetchStock(selectedCommerce); // Refresh stock information
    } catch (error) {
      console.error('Error updating stock:', error);
      alert('Failed to update stock');
    }
  };

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
    if (!productId || !selectedCommerce) return;  // Vérifier que le commerce et le produit sont bien sélectionnés
  
    const fetchProductQuantity = async () => {
      try {
        const response = await axios.get(`commerces/${selectedCommerce}/produits/${productId}/quantite`);
        // Si la quantité est nulle ou indéfinie, utiliser 0 comme valeur par défaut
        const quantity = response.data && response.data.quantite != null ? response.data.quantite : 0;
        setNewProductQuantity(quantity);
      } catch (error) {
        console.error('Error fetching product quantity:', error);
        setNewProductQuantity(0); // Mettre à 0 si une erreur survient
      }
    };
  
    fetchProductQuantity();
  };
  
  const handleQuantityChange = (e) => {
    setNewProductQuantity(e.target.value);
  };

  return (
    <div className="container">
      <div className='d-flex justify-content-center'><h4>Boutiques</h4></div>
      <div className="commerces-list list-group">
        {commerces.map((commerce) => (
          <div className='list-group-item list-group-item-action' key={commerce.id} onClick={() => handleCommerceClick(commerce.id)}>
            {commerce.id} - {commerce.libelle}
          </div>
        ))}
      </div>

      {selectedCommerce && (
        <div className="popup mt-4">
          <div className="popup-content">
          <div className='d-flex justify-content-center'><h4>Stock du commerce <span className='text-success fw-bold'>{selectedCommerce}</span></h4></div>
            <select
              className="form-select"
              onChange={(e) => handleSelectProduct(e.target.value)}
              value={selectedProduct}
              disabled={stock.length === 0} // Désactive le select si stock n'est pas encore chargé
            >
              <option value="">Sélectionner un produit</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.libelleProduit}</option>
              ))}
            </select>

            {selectedProduct && (
              <div className='d-flex justify-content-center mt-2'>
              <button className="btn btn-secondary" onClick={() => setSelectedCommerce(null)}>Fermer le menu</button>
            </div>
            )}
              </div>
              <div className='mt-4'>
                <div className='d-flex justify-content-center'><h4>Quantité actuelle pour <span className='text-primary fw-bold'>{products.find(p => p.id == selectedProduct)?.libelleProduit}</span></h4></div>
                <input
                  className="form-control"
                  type="number"
                  value={newProductQuantity}
                  onChange={handleQuantityChange}
                />
                <div className='d-flex justify-content-center mt-2'>
                  <button className="btn btn-primary" onClick={() => updateProductQuantity(selectedProduct, newProductQuantity)}>
                    Mettre à jour quantité
                  </button>
                </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
