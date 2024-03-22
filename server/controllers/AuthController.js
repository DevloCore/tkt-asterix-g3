const { Request, Response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { hashSaltRounds, jwtPrivateKey, bddErrorMessage } = require('../helper');
const db = require('../db');
const Validator = require('validatorjs');

function incorrect() { return {"error":"Identifiant ou mot de passe incorrect."} }

module.exports = {
    login: async (/** @type { Request } */ request, /** @type { Response } */ response) => {
        const username = request.body.username;
        const password = request.body.password;
        const validator = new Validator({
            username, password
        },
        {
            "username":'required|string',
            "password":'required|string'
        });

        if(validator.passes()) {
            await db("utilisateur").where("email",username).first()
                .then(async (user) => {
                    if(!user)
                        response.json(incorrect());
                    else if(await bcrypt.compare(password,user.motdepasse))
                    {
                        const j = jwt.sign({"email":user.email,"admin":user.isAdmin}, jwtPrivateKey, { expiresIn:"30d" })
                        response.json({"success":true,"token":j,"email":user.email});
                    }
                    else
                    response.json(incorrect());
                })
                .catch(() => {response.json({"error": bddErrorMessage});});
        }
        else response.json({"error":"Missing information."});
    },
    testIsAdmin: (/** @type { Request } */ request, /** @type { Response } */ response) => {
        response.json({"success":true});
    }
};