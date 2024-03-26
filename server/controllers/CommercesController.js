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
