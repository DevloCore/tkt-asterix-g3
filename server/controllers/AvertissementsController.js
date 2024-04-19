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

export const createAvertissement = async (req, res) => {
    try {
        const avertissement = {
            ...req.body,
            date: new Date(), // Utiliser la date actuelle
            email_utilisateur: req.body.email_utilisateur // Assumer que l'email est envoyé dans le corps de la requête
        };

        const [id] = await db('Avertissements').insert(avertissement).returning('id');
        const newAvertissement = await db('Avertissements').where({ id }).first();
        res.status(201).json(newAvertissement);
    } catch (error) {
        console.error('Error creating avertissement:', error);
        res.status(500).send('Internal server error');
    }
};


export const updateAvertissement = async (req, res) => {
    try {
        const { id } = req.params;
        await db('Avertissement').where({ id }).update(req.body);
        const updatedAvertissement = await db('Avertissement').where({ id }).first();
        res.json(updatedAvertissement);
    } catch (error) {
        console.error('Error updating avertissement:', error);
        res.status(500).send('Internal server error');
    }
};

export const deleteAvertissement = async (req, res) => {
    try {
        const { id } = req.params;
        await db('Avertissement').where({ id }).del();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting avertissement:', error);
        res.status(500).send('Internal server error');
    }
};