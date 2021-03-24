require("dotenv").config();
require("./strategies/local.js");
const express = require("express");
const session = require("express-session");
const fileUpload = require('express-fileupload');
const passport = require("passport");
const cors = require("cors");
const MySQLStore = require('express-mysql-session')(session);
const { isAuthenticated, isProf } = require("./middleware.js");

const authRouter = require("./routes/auth.js");
const modeleRouter = require("./routes/modele.js");
const architectureRouter = require("./routes/architecture.js");
const etudiantRouter = require("./routes/etudiant.js");
const promoRouter = require("./routes/promo.js");
const uniteRouter = require("./routes/unite.js");
const correctionRouter = require("./routes/correction.js");
const { sh } = require("./utils.js");

const app = express();

app.use(session({
    name: "connection.sid",
    secret: process.env.COOKIE_SECRET,
    cookie: {
        maxAge: 3600000,
        sameSite: 'strict',
        domain: process.env.DOMAIN,
        path: '/',
    },
    store: new MySQLStore({ host: process.env.DB_HOST, database: process.env.DB_DATABASE, user: process.env.DB_USER, password: process.env.DB_PWD }),
    saveUninitialized: false,
    resave: false,
}));

app.use(cors({
    origin: [process.env.ORIGINHTTP, process.env.ORIGINHTTPS],
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
app.use('/correction', correctionRouter);

app.get('/dump', isAuthenticated, isProf, async (_req, res) => {
    await sh(`mysqldump -P ${process.env.DB_PORT} -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PWD} ${process.env.DB_DATABASE} > dump.sql`).catch(() => { });
    return res.download(__dirname + '/dump.sql');
});

app.listen(process.env.PORT, () => {
    console.clear();
    console.log(`Le serveur fonctionne sur le port ${process.env.PORT}`);
});