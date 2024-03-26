import db from '../db.js';

// Fonction pour récupérer toutes les attractions depuis la base de données
export const getAttractions = async (req, res) => {
    try {
        // Récupérer toutes les attractions depuis la base de données en utilisant knex
        const attractions = await db.select().from('ATTRACTION');
        
        // Renvoyer les attractions récupérées en réponse
        res.json(attractions);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
