import db from '../db.js';

// Fonction pour récupérer toutes les attractions depuis la base de données
export const getAlerts = async (req, res) => {
    try {
        // Récupérer toutes les attractions depuis la base de données en utilisant knex
        const alerts = await db.select().from('AVERTISSEMENT');
        
        // Renvoyer les attractions récupérées en réponse
        res.json(alerts);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour récupérer toutes les attractions depuis la base de données
export const getGravite = async (req, res) => {
    try {
        // Récupérer toutes les attractions depuis la base de données en utilisant knex
        const gravites = await db.select().from('GRAVITE');
        
        // Renvoyer les attractions récupérées en réponse
        res.json(gravites);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};