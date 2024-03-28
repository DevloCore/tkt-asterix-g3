import db from '../db.js';

// Fonction pour récupérer toutes les commerces depuis la base de données
export const getMissions = async (req, res) => {
    try {
        const missions = await db.select().from('MISSION');
        
        res.json(missions);
    } catch (error) {
        console.error('Error while fetching missions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};