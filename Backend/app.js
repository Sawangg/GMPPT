require("dotenv").config();
require("./strategies/local.js");
const express = require("express");
const session = require("express-session");
const fileUpload = require('express-fileupload');
const passport = require("passport");
const cors = require("cors");
const MySQLStore = require('express-mysql-session')(session);

const authRouter = require("./routes/auth.js");
const modeleRouter = require("./routes/modele.js");
const architectureRouter = require("./routes/architecture.js");
const etudiantRouter = require("./routes/etudiant.js");
const promoRouter = require("./routes/promo.js");
const uniteRouter = require("./routes/unite.js");

const app = express();

app.use(session({
    name: "connection.sid",
    secret: process.env.COOKIE_SECRET,
    cookie: {
        maxAge: 86400000,
        sameSite: 'strict',
        domain: process.env.DOMAIN,
        path: '/',
    },
    store: new MySQLStore({ host: process.env.DB_HOST, database: process.env.DB_DATABASE, user: process.env.DB_USER, password: process.env.DB_PWD }),
    saveUninitialized: false,
    resave: false,
}));

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

app.use(passport.initialize());
app.use(passport.session());

app.disable('x-powered-by');

app.use('/auth', authRouter);
app.use('/modele', modeleRouter);
app.use('/architecture', architectureRouter);
app.use('/etudiant', etudiantRouter);
app.use('/promo', promoRouter);
app.use('/unite', uniteRouter);

app.listen(3001, () => {
    console.log("Le serveur fonctionne sur le port 3001");
});