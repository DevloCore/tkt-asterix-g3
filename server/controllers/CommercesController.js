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