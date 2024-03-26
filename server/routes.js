import { login, testIsAdmin } from './controllers/AuthController.js';
import { isAdmin } from './helper.js';
import { getAttractions } from './controllers/AttractionController.js';

export default function(/** @type { import('express').IRouter } */ app) {
    // Définir la route POST pour la connexion
    app.post('/login', isAdmin, login);

    // Middleware pour vérifier les autorisations admin pour toutes les routes sous /admin
    app.use('/admin', isAdmin);

    // Route GET pour tester si l'utilisateur est un administrateur
    app.get('/admin/test', testIsAdmin);

    // Route GET pour récupérer toutes les attractions
    app.get('/attractions', getAttractions);
}
