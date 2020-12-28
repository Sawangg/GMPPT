const localStrat = require("passport-local");
const passport = require("passport");
const CryptoJS = require("crypto-js");
const db = require("../databases.js");

passport.serializeUser((user, done) => {
    return done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    try {
        const result = await db.promise().execute(`SELECT * FROM authentification WHERE USERNAME = '${username}'`);
        return result[0][0] ? done(null, result[0][0]) : done(null, null);
    } catch (err) {
        return done(err, false);
    }
});

passport.use(new localStrat(async (username, password, done) => {
    return await db.promise().execute(`SELECT * FROM authentification WHERE USERNAME = '${username}'`).then(([rows]) => {
        if (!rows[0]) return done(null, false);
        if (comparePwd(password, rows[0].password)) {
            return done(null, rows[0]);
        } else {
            return done(null, false);
        }
    }).catch(err => {
        return done(err, false);
    });
}));


//J'ai pas trouvé de meilleur endroit on peut les bouger
function comparePwd(pwdClair, pwdCrypted) {
    return pwdClair === CryptoJS.AES.decrypt(pwdCrypted, process.env.CRYPT_SECRET).toString(CryptoJS.enc.Utf8);
}

function encrypt(pwd) {
    return CryptoJS.AES.encrypt(pwd, process.env.CRYPT_SECRET).toString();
}

module.exports = { comparePwd, encrypt };