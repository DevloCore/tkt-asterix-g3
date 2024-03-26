import Attraction from '../models/Attraction.js';

export async function getAttractions(req, res) {
    try {
        const attractions = await Attraction.findAll({
            attributes: ['id', 'nom', 'description']
        });
        res.json(attractions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des attractions." });
    }
}