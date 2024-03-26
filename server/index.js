import express from 'express';
import { createServer } from 'http';
import { originUrl, preflight } from './helper.js';
import db from './db.js';
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', originUrl);
    res.setHeader('Access-Control-Allow-Headers', ['Authorization','Content-Type'])
    res.setHeader('Access-Control-Allow-Methods', ["OPTIONS","GET","POST","PATCH","PUT","DELETE"]);
    next();
})
app.use(preflight);

const server = createServer(app);

routes(app);

server.listen(process.env.PORT || 3000, process.env.IP || '127.0.0.1', () => {
    console.log("Server running");
});
