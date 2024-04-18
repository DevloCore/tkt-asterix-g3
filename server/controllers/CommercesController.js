import db from '../db.js';

// Fonction pour récupérer toutes les commerces depuis la base de données
export const getCommerces = async (req, res) => {
    try {
        // Récupérer toutes les attractions depuis la base de données en utilisant knex
        const commerces = await db.select().from('COMMERCE');
        
        // Renvoyer les commerces récupérées en réponse
        res.json(commerces);
    } catch (error) {
        console.error('Error while fetching commerces:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour récupérer les produits d'un commerce spécifique en utilisant son ID
export const getProduitsByCommerceId = async (req, res) => {
    try {
        const { id_commerce } = req.params; // Récupérer l'ID du commerce depuis les paramètres de la requête
        
        // Joindre la table produit avec la table stocker pour récupérer les informations nécessaires
        const produits = await db('STOCKER')
            .join('PRODUIT', 'STOCKER.id_produit', '=', 'PRODUIT.id')
            .select('PRODUIT.libelleProduit', 'STOCKER.quantite')
            .where('STOCKER.id_commerce', id_commerce);
        
        // Renvoyer les produits récupérés en réponse
        res.json(produits);
    } catch (error) {
        console.error('Error while fetching produits by commerce ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Dans CommercesController.js

export const updateProductStock = async (req, res) => {
    const { id_commerce, id_produit } = req.params;  // Extraction des paramètres de l'URL
    const { quantite } = req.body;  // Extraction de la quantité du corps de la requête

    try {
        const existingProduct = await db('STOCKER')
            .where({ id_commerce: id_commerce, id_produit: id_produit })
            .first();  // Vérifier si l'entrée existe déjà

        if (existingProduct) {
            // Mise à jour de la quantité si le produit existe déjà
            await db('STOCKER')
                .where({ id_commerce: id_commerce, id_produit: id_produit })
                .update({ quantite: quantite });
        } else {
            // Créer une nouvelle entrée si le produit n'existe pas dans le stock
            await db('STOCKER').insert({
                id_commerce: id_commerce,
                id_produit: id_produit,
                quantite: quantite
            });
        }

        res.json({ message: 'Stock updated successfully' });
    } catch (error) {
        console.error('Error updating or creating stock:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getProducts = async (req, res) => {
    try {
        // Récupérer tous les produits depuis la base de données
        const produits = await db.select('*').from('PRODUIT');
        
        // Renvoyer les produits en réponse
        res.json(produits);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
