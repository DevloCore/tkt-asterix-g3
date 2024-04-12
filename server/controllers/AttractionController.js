import db from '../db.js';

// Fonction pour récupérer toutes les attractions depuis la base de données
export const getAttractions = async (req, res) => {
    try {
        console.log(req.query)
        // Récupérer toutes les attractions depuis la base de données en utilisant knex
        const attractions = await db.select().from('ATTRACTION');
        
        // Renvoyer les attractions récupérées en réponse
        res.json(attractions);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getAttractionsFiltered = async (req, res) => {
    try {
        const taille = req.query.taille;
        const theme = req.query.theme;
        const estAccompagne = req.query.estAccompagne;
        console.log(estAccompagne)
        // Récupérer toutes les attractions depuis la base de données en utilisant knex
        const request = db.pluck("id").from('ATTRACTION')
            .where('id_theme', theme)
            .andWhere((qb) => {
                qb.where('taille_min', "<=", taille)
                if(estAccompagne == "true") {
                    qb.orWhere('taille_min_acc', "<=", taille);
                }
            });

        const attractions = await request;
        
        res.json(attractions);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Fonction pour récupérer les liens des images d'une attraction spécifique
export const getImagesByAttractionId = async (req, res) => {
    try {
        const { attraction_id } = req.params; // Récupérer l'ID de l'attraction depuis les paramètres de la requête
        
        // Récupérer les liens des images associées à l'attraction spécifiée depuis la base de données en utilisant knex
        const images = await db('image')
            .select('nom','lien')
            .where('id_attraction', attraction_id);
        
        // Renvoyer les liens des images récupérées en réponse
        res.json(images);
    } catch (error) {
        console.error('Error while fetching images by attraction ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour récupérer toutes les attractions depuis la base de données
export const getThemes = async (req, res) => {
    try {
        const themes = await db.select().from('THEME');
        
        // Renvoyer les attractions récupérées en réponse
        res.json(themes);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour récupérer toutes les attractions depuis la base de données
export const getType = async (req, res) => {
    try {
        const type = await db.select().from('TYPE');
        
        // Renvoyer les attractions récupérées en réponse
        res.json(type);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour récupérer toutes les attractions depuis la base de données
export const getStatutAttractions = async (req, res) => {
    try {
        const statut = await db.select().from('STATUT_ATTRACTION');
        
        // Renvoyer les attractions récupérées en réponse
        res.json(statut);
    } catch (error) {
        console.error('Error while fetching attractions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};