import { login, testIsAdmin } from './controllers/AuthController.js';
import { isAdmin } from './helper.js';
import { getAttractions, getImagesByAttractionId } from './controllers/AttractionController.js';
import { getCommerces, getProduitsByCommerceId } from './controllers/CommercesController.js';
import { getMissions } from './controllers/MissionsController.js';
import { getMetiers,getEquipes } from './controllers/EquipesController.js';

export default function(/** @type { import('express').IRouter } */ app) {
    // Définir la route POST pour la connexion
    app.post('/login', isAdmin, login);

    // Middleware pour vérifier les autorisations admin pour toutes les routes sous /admin
    app.use('/admin', isAdmin);

    // Route GET pour tester si l'utilisateur est un administrateur
    app.get('/admin/test', testIsAdmin);

    // Route GET pour récupérer toutes les attractions
    app.get('/attractions', getAttractions);

    // Route GET pour récupérer toutes les commerces
    app.get('/commerces', getCommerces);

    // Route GET pour récupérer les produits d'un commerce spécifique en utilisant son ID
    app.get('/commerces/:id_commerce/produits', getProduitsByCommerceId);

    // Route GET pour récupérer les liens des images d'une attraction spécifique
    app.get('/attraction/:attraction_id/images', getImagesByAttractionId);

    // Route GET pour récupérer les missions
    app.get('/missions', getMissions);
    
    // Route GET pour récupérer les metiers
    app.get('/metiers', getMetiers);

    // Route GET pour récupérer les equipes
    app.get('/equipes', getEquipes);
}
