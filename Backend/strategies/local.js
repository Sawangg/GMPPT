const localStrat = require("passport-local");
const passport = require("passport");
const db = require("../databases.js");
const { comparePwd } = require("../utils.js");

passport.serializeUser((user, done) => {
    return done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    return await db.promise().execute(`SELECT A.id_auth, username, password, isProf, id_promo FROM authentification A LEFT OUTER JOIN etudiant E ON E.id_auth = A.id_auth WHERE USERNAME = '${username}'`).then(([rows]) => {
        if(!rows[0]) return done(null, null);
        return done(null, rows[0]);
    }).catch(err => {
        return done(err, false);
    });
});

passport.use(new localStrat(async (username, password, done) => {
    return await db.promise().execute(`SELECT A.id_auth, username, password, isProf, id_promo FROM authentification A LEFT OUTER JOIN etudiant E ON E.id_auth = A.id_auth WHERE USERNAME = '${username}'`).then(([rows]) => {
        if (!rows[0]) return done(null, false);
        if (comparePwd(password, rows[0].password, username)) {
            return done(null, rows[0]);
        } else {
            return done(null, false);
        }
    }).catch(err => {
        return done(err, false);
    });
}));