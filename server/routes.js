import { login, testIsAdmin } from './controllers/AuthController.js';
import { isAdmin } from './helper.js';
import { getAttractions, getImagesByAttractionId, getThemes,getType,getStatutAttractions, getAttractionsFiltered } from './controllers/AttractionController.js';
import { getCommerces, getProduitsByCommerceId, updateProductStock,getProducts } from './controllers/CommercesController.js';
import { getMissions, getStatutMissions, updateMission, addMission, deleteMission } from './controllers/MissionsController.js';
import { getMetiers,getEquipes } from './controllers/EquipesController.js';
import { getAlerts,getGravite } from './controllers/AvertissementsController.js';
import { getUtilisateurs, addUtilisateur, deleteUtilisateur, updateUtilisateur } from './controllers/UsersController.js';

export default function(/** @type { import('express').IRouter } */ app) {
    // Définir la route POST pour la connexion
    app.post('/login', login);

    // Middleware pour vérifier les autorisations admin pour toutes les routes sous /admin
    app.use('/admin', isAdmin);

    // Route GET pour tester si l'utilisateur est un administrateur
    app.get('/admin/test', testIsAdmin);

    // Route GET pour récupérer toutes les attractions
    app.get('/attractions', getAttractions);

    // Route GET pour récupérer toutes les attractions
    app.get('/filterAttractions', getAttractionsFiltered);

    // Route GET pour récupérer toutes les attractions Themes
    app.get('/attractions/themes', getThemes );

    // Route GET pour récupérer toutes les attractions Types
    app.get('/attractions/types', getType);

    // Route GET pour récupérer toutes les attractions Statuts
    app.get('/attractions/statuts', getStatutAttractions);

    // Route GET pour récupérer toutes les commerces
    app.get('/commerces', getCommerces);

    app.put('/commerces/:id_commerce/produits/:id_produit', updateProductStock);

    app.get('/produits', getProducts);

    // Route GET pour récupérer les produits d'un commerce spécifique en utilisant son ID
    app.get('/commerces/:id_commerce/produits', getProduitsByCommerceId);

    // Route GET pour récupérer les liens des images d'une attraction spécifique
    app.get('/attraction/:attraction_id/images', getImagesByAttractionId);

    // Route GET pour récupérer les missions
    app.get('/missions', getMissions);
    // Route PATCH pour modifier mission
    app.patch('/admin/editmission/:id',updateMission);
    // Route POST add mission
    app.post('/admin/addmission', addMission);
    // Route DELETE pour supprimer une mission
    app.delete('/admin/deletemission/:id', deleteMission);

    // Route GET statut missions
    app.get('/missions/statuts', getStatutMissions);
    
    // Route GET pour récupérer les metiers
    app.get('/metiers', getMetiers);

    // Route GET pour récupérer les equipes
    app.get('/equipes', getEquipes);

    // Route GET pour récupérer les alerts
    app.get('/avertissements', getAlerts);

    // Route GET pour récupérer les gravités
    app.get('/gravites', getGravite);

    // Route GET pour récupérer les utilisateurs
    app.get('/users', getUtilisateurs);
    // Route POST pour add user
    app.post('/adduser',addUtilisateur);
    // Route PATCH pour modifier user avec l'email comme paramètre
    app.patch('/edituser/:email', updateUtilisateur);
    // Route DELETE pour supprimer un utilisateur par email
    app.delete('/deleteuser/:email', deleteUtilisateur);
}
