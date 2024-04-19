import db from '../db.js';


// Fonction pour récupérer toutes les utilisateurs depuis la base de données
export const getAllBillets = async (req, res) => {
    try {
        const billets = await db.select().from('BILLETERIE');
        
        res.json(billets);
    } catch (error) {
        console.error('Error while fetching missions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Ajouter un nouveau type de billet
export const addBillet = async (req, res) => {
    try {
        const { libelle, prix } = req.body;
        const [newBillet] = await db('billeterie').insert({
            libelle,
            prix
        }).returning('*'); // retourne l'objet inséré si supporté par la DB

        res.status(201).json({ message: "Billet ajouté avec succès", billet: newBillet });
    } catch (error) {
        console.error('Error while adding a new billet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Modifier le prix d'un billet existant
export const updateBillet = async (req, res) => {
    try {
        const { id } = req.params;
        const { prix } = req.body;
        const [updatedBillet] = await db('billeterie')
            .where({ id })
            .update({ prix })
            .returning('*'); // retourne l'objet mis à jour si supporté par la DB

        if (!updatedBillet) {
            return res.status(404).json({ message: "Billet non trouvé" });
        }

        res.json({ message: "Prix du billet mis à jour avec succès", billet: updatedBillet });
    } catch (error) {
        console.error('Error while updating billet price:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Supprimer un type de billet
export const deleteBillet = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCount = await db('billeterie')
            .where({ id })
            .del();

        if (deleteCount === 0) {
            return res.status(404).json({ message: "Billet non trouvé ou déjà supprimé" });
        }

        res.json({ message: "Billet supprimé avec succès" });
    } catch (error) {
        console.error('Error while deleting billet:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
