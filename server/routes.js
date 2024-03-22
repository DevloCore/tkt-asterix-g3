// const CodeController = require('./controllers/CodeController.js');
// const MainController = require('./controllers/MainController');
// const QuestionController = require('./controllers/QuestionController.js');
const { isAdmin } = require('./helper.js');

module.exports = function(/** @type { import('express').IRouter } */ app) {
    // app.get('/', MainController.root);
    // app.post('/login', MainController.login);

    // app.use('/admin', isAdmin);
    //     app.get('/admin/codes', CodeController.getCodes);
    //     app.post('/admin/code', CodeController.addCode);
    //     app.delete('/admin/code/:id', CodeController.deleteCode);
    //     app.get('/admin/question/:id', QuestionController.getQuestion);
    //     app.get('/admin/questions', QuestionController.getQuestions);
    //     app.post('/admin/question', QuestionController.addQuestion);
    //     app.patch('/admin/question/:id', QuestionController.editQuestion);
    //     app.delete('/admin/question/:id', QuestionController.deleteQuestion);
}