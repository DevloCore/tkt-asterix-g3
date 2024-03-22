import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { hashSaltRounds, jwtPrivateKey, bddErrorMessage } from '../helper.js';
import db from '../db.js';
import Validator from 'validatorjs';

function incorrect() { return {"error":"Identifiant ou mot de passe incorrect."} }

export async function login(/** @type { express.Request } */ request, /** @type { express.Response } */ response)
{
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
                else if(await bcrypt.compare(password,user.password))
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
}

export function testIsAdmin(/** @type { Request } */ request, /** @type { Response } */ response)
{
    response.json({"success":true});
}