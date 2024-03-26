import { login, testIsAdmin } from './controllers/AuthController.js';
import { isAdmin } from './helper.js';

export default function(/** @type { import('express').IRouter } */ app) {
    app.post('/login', isAdmin, login);

    app.use('/admin', isAdmin);
        app.get('/admin/test', testIsAdmin);
}