import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './assets/attractions.css';

function Menu() {
  const [commerces, setCommerces] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCommerce, setSelectedCommerce] = useState(null);
  const [stock, setStock] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [newProductQuantity, setNewProductQuantity] = useState(''); // Pour ajouter ou modifier la quantité

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
    const selected = stock.find(item => item.id_produit === productId);
    setNewProductQuantity(selected ? selected.quantite : '');
  };

  const handleQuantityChange = (e) => {
    setNewProductQuantity(e.target.value);
  };

  return (
    <div>
      <h3>Boutiques :</h3>
      <ul className="commerces-list">
        {commerces.map((commerce) => (
          <li key={commerce.id} onClick={() => handleCommerceClick(commerce.id)}>
            {commerce.id} - {commerce.libelle}
          </li>
        ))}
      </ul>

      {selectedCommerce && (
        <div className="popup">
          <div className="popup-content">
            <h3>Stock du Commerce {selectedCommerce} :</h3>
            <select onChange={(e) => handleSelectProduct(e.target.value)} value={selectedProduct}>
              <option value="">Selectionner un produit</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.libelleProduit}</option>
              ))}
            </select>

            {selectedProduct && (
                <div>
                    <h4>Quantité Actuelle pour {products.find(p => p.id === selectedProduct)?.libelleProduit}:</h4>
                    <input
                    type="number"
                    value={newProductQuantity}
                    onChange={handleQuantityChange}
                    />
                    <button onClick={() => updateProductQuantity(selectedProduct, newProductQuantity)}>
                    Update Quantity
                    </button>
                </div>
                )}

            <button onClick={() => setSelectedCommerce(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;