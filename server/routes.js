const AuthController = require('./controllers/AuthController.js');
const { isAdmin } = require('./helper.js');

module.exports = function(/** @type { import('express').IRouter } */ app) {
    app.post('/login', AuthController.login);

    app.use('/admin', isAdmin);
        app.get('/admin/test', AuthController.testIsAdmin);
}