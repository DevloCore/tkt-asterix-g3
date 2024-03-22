const jwt = require('jsonwebtoken');

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

Array.prototype.shuffle = function () {
    let currentIndex = this.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = this[currentIndex];
        this[currentIndex] = this[randomIndex];
        this[randomIndex] = temporaryValue;
    }

    return this;
};

const originUrl = "http://localhost:5173";
const hashSaltRounds = 10;
const jwtPrivateKey = "FuCDM88fgzeioghià_yègdza28oSHdt__zT667SHwFdu8kXufiGS";
const bddErrorMessage = "Le serveur ne répond pas. Veuillez réessayer plus tard.";

module.exports = {
    delay,
    hashSaltRounds,
    jwtPrivateKey,
    isAdmin,
    preflight,
    betterText,
    originUrl,
    bddErrorMessage,
}