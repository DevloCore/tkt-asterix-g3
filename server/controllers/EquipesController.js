import db from '../db.js';

// Fonction pour récupérer toutes les commerces depuis la base de données
export const getMetiers = async (req, res) => {
    try {
        const metiers = await db.select().from('METIER');
        
        res.json(metiers);
    } catch (error) {
        console.error('Error while fetching missions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour récupérer toutes les commerces depuis la base de données
export const getEquipes = async (req, res) => {
    try {
        const equipes = await db.select().from('EQUIPE');
        
        res.json(equipes);
    } catch (error) {
        console.error('Error while fetching missions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};