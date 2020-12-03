require("dotenv").config();
require("./strategies/local.js");
const express = require("express");
const session = require("express-session");
const passport = require("passport");

const etudiantRouter = require("./routes/etudiant.js");
const authRouter = require("./routes/auth.js");

const app = express();

app.use(session({
    name: "connection.sid",
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    resave: false,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.sendStatus(200);
});

app.use('/etudiant', etudiantRouter);
app.use('/auth', authRouter);

app.listen(3001, () => {
    console.log("Le serveur fonctionne sur le port 3001");
});