const localStrat = require("passport-local");
const passport = require("passport");
const db = require("../databases.js");

passport.serializeUser((user, done) => {
    return done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    try {
        const result = await db.promise().execute(`SELECT * FROM authentification WHERE USERNAME = '${username}'`);
        return result[0][0] ? done(null, result[0][0]) : done(null, null);
    } catch(err) {
        return done(err, false);
    }
});

passport.use(new localStrat(
    async (username, password, done) => {
        try {
            const result = await db.promise().execute(`SELECT * FROM authentification WHERE USERNAME = '${username}'`);
            if(result[0].length === 0) {
                return done(null, false);
            } else {
                if(result[0][0].password === password) {
                    return done(null, result[0][0]);
                } else {
                    return done(null, false);
                }
            }
        } catch(err) {
            return done(err, false);
        }
    }
));