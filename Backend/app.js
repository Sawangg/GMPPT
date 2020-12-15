require("dotenv").config();
require("./strategies/local.js");
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const MySQLStore = require('express-mysql-session')(session);

const etudiantRouter = require("./routes/etudiant.js");
const authRouter = require("./routes/auth.js");
const sujetRouter = require("./routes/sujet.js");

const app = express();

app.use(session({
    name: "connection.sid",
    secret: process.env.COOKIE_SECRET,
    cookie: { 
        maxAge: 86400000,
        sameSite: 'strict',
        domain: 'localhost',
        path: '/',
    },
    store: new MySQLStore({ host: process.env.DB_HOST, database: process.env.DB_DATABASE, user: process.env.DB_USER, password: process.env.DB_PWD }),
    saveUninitialized: false,
    resave: false,
}));

app.use(cors({
    origin: [ "http://localhost:3000"],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/etudiant', etudiantRouter);
app.use('/auth', authRouter);
app.use('/sujet', sujetRouter);

app.listen(3001, () => {
    console.log("Le serveur fonctionne sur le port 3001");
});