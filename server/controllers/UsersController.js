import db from '../db.js';
import bcrypt from 'bcryptjs';
import { hashSaltRounds } from '../helper.js';

// Fonction pour récupérer toutes les utilisateurs depuis la base de données
export const getUtilisateurs = async (req, res) => {
    try {
        const users = await db.select().from('UTILISATEUR');
        
        res.json(users);
    } catch (error) {
        console.error('Error while fetching missions:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour ajouter un nouvel utilisateur
export const addUtilisateur = async (req, res) => {
    try {
        const { email, password, nom, prenom, isAdmin, id_equipe, id_metier } = req.body;

        const hashedPassword = bcrypt.hash(password, hashSaltRounds).then(async function(result){
            // Insertion du nouvel utilisateur dans la base de données
        const [userId] = await db('UTILISATEUR').insert({
            email,
            password: result,
            nom,
            prenom,
            isAdmin,
            id_equipe,
            id_metier
        });

        res.status(201).json({ id: userId, message: 'Utilisateur ajouté avec succès' });
        })
        
    } catch (error) {
        console.error('Error while adding user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour modifier un utilisateur existant
export const updateUtilisateur = async (req, res) => {
    try {
        const { email } = req.params; // Utilisez l'email comme paramètre
        const { password, nom, prenom, isAdmin, id_equipe, id_metier } = req.body;

        // Vérification si l'utilisateur existe avec l'email
        const existingUser = await db('UTILISATEUR').where('email', email).first();
        if (!existingUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Hash du nouveau mot de passe si fourni
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 12);
        }

        // Mise à jour des données de l'utilisateur dans la base de données
        await db('UTILISATEUR').where('email', email).update({
            password: hashedPassword || existingUser.password,
            nom: nom || existingUser.nom,
            prenom: prenom || existingUser.prenom,
            isAdmin: isAdmin !== undefined ? isAdmin : existingUser.isAdmin,
            id_equipe: id_equipe || existingUser.id_equipe,
            id_metier: id_metier || existingUser.id_metier
        });

        res.json({ message: 'Utilisateur modifié avec succès' });
    } catch (error) {
        console.error('Error while updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Fonction pour supprimer un utilisateur existant
export const deleteUtilisateur = async (req, res) => {
    try {
        const { email } = req.params;

        // Vérification si l'utilisateur existe
        const existingUser = await db('UTILISATEUR').where('email', email).first();
        if (!existingUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Suppression de l'utilisateur de la base de données
        await db('UTILISATEUR').where('email', email).del();

        res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
        console.error('Error while deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};