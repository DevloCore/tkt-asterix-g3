import jwt from "jsonwebtoken";

export function delay(seconds) { return new Promise(res => setTimeout(res, seconds * 1000)); }

export function preflight(request, response, next) {
    if(request.method == 'OPTIONS') response.sendStatus(200);
    else next();
}

export function betterText(text) {
    if(text == undefined) return undefined;
    return text.trim().replace(/\s\s+/g, ' ');
}

export function isAdmin(request, response, next) {
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

export const originUrl = "http://localhost:5173";
export const hashSaltRounds = 10;
export const jwtPrivateKey = "FuCDM88fgzeioghià_yègdza28oSHdt__zT667SHwFdu8kXufiGS";
export const bddErrorMessage = "Le serveur ne répond pas. Veuillez réessayer plus tard.";