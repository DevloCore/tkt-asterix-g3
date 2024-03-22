const jwt = require('jsonwebtoken');
const db = require('./db');

function delay(seconds) { return new Promise(res => setTimeout(res, seconds * 1000)); }

function preflight(request, response, next) {
    if(request.method == 'OPTIONS') response.sendStatus(200);
    else next();
}

function betterText(text) {
    if(text == undefined) return undefined;
    return text.trim().replace(/\s\s+/g, ' ');
}

function isAdmin(request, response, next) {
    const bearerHeader = request.headers.authorization;
    if(bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        jwt.verify(token, jwtPrivateKey, function(error, payload) {
            if(error || !payload.admin) response.sendStatus(401);
            else {
                request.payload = payload;
                next();
            }
        })
    }
    else response.sendStatus(401);
}

async function questionsParTheme() {
    const questions = await db("questions").join("themes", "themes.theme_id", "=", "questions.theme_id")

    const questionsParTheme = {};
    questions.forEach(question => {
        question.enabled = true;
        const { theme_id, nom_theme, colorHexa } = question;
        if (!questionsParTheme[theme_id]) {
            // const libelle = "Thème n°" + theme_id + ": " + nom_theme;
            questionsParTheme[theme_id] = { theme_id, nom_theme, colorHexa, questions: [] };
        }
        questionsParTheme[theme_id].questions.push(question);
    });
    // Convertir l'objet en tableau pour obtenir le résultat final
    return Object.values(questionsParTheme);
}

function reponsesParQuestion(questions) {
    const reponsesParQuestion = {};
    questions.forEach(reponse => {
        const { theme_id, nom_theme, question_id, libelle_question, colorHexa, cat_age } = reponse;
        if (!reponsesParQuestion[question_id]) {
            reponsesParQuestion[question_id] = { theme_id, nom_theme, question_id, libelle_question, colorHexa, cat_age, reponses: {} };
        }
        reponsesParQuestion[question_id].reponses[reponse.reponse_id] = reponse;
    });
    
    return reponsesParQuestion;
}

Array.prototype.shuffle = function () {
    let currentIndex = this.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

const originUrl = process.env.NODE_ENV === "production" ? "https://quiz.lesenfantsdetamar.fr" : "http://localhost:5173";
const hashSaltRounds = 10;
const jwtPrivateKey = "FuCDM8888yNq7JicoGHf_-RF9F0AfAg43ajAe28oSHdt__zT667SHwFdu8kXufiGS";
const bddErrorMessage = "Le serveur ne répond pas. Veuillez réessayer plus tard.";
const presentateurName = "PRÉSENTATEUR";

module.exports = {
    delay,
    generateCode,
    questionsParTheme,
    reponsesParQuestion,
    hashSaltRounds,
    jwtPrivateKey,
    isAdmin,
    preflight,
    betterText,
    originUrl,
    bddErrorMessage,
    presentateurName,
}