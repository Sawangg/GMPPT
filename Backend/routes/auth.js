const { Router } = require("express");
const passport = require("passport");
const CryptoJS = require("crypto-js");
const router = Router();
const db = require("../databases.js");
const { isAuthenticated } = require("../middleware.js");

router.get("/", isAuthenticated, (req, res) => {
    return res.send(req.user).status(200);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    return res.sendStatus(200);
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.cookie("connection.sid", "", { expires: new Date() });
    db.promise().execute(`DELETE FROM sessions WHERE session_id = '${req.sessionID}'`).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/:username/changepwd', isAuthenticated, async (req, res) => {
    const { username } = req.params;
        await db.promise().execute(`SELECT password FROM authentification WHERE username = '${username}'`).then(async ([rows]) => {
            if (rows[0].password == null) return res.sendStatus(404);
            if(CryptoJS.AES.decrypt(rows[0].password, process.env.CRYPT_SECRET).toString(CryptoJS.enc.Utf8) === req.body.passwords.oldPassword) {
                await db.promise().execute(`UPDATE authentification SET password = '${CryptoJS.AES.encrypt(req.body.passwords.newPassword, process.env.CRYPT_SECRET).toString()}' WHERE username = '${username}'`).then(() => {
                    return res.sendStatus(200);
                }).catch(() => {
                    return res.sendStatus(500);
                });
            } else {
                return res.sendStatus(401);
            }
        }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:username/profilepic', isAuthenticated, (req, res) => {
    const { username } = req.params;
    db.promise().execute(`SELECT profilepic FROM authentification WHERE username = '${username}'`).then(([rows]) => {
        if (rows[0].profilepic == null) return res.sendStatus(404);
        return res.send(rows[0]).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/:username/profilepic/new', isAuthenticated, (req, res) => {
    const { username } = req.params;
    const profilePic = req.files.profilePic.data;
    db.promise().query(`UPDATE authentification SET ? WHERE username = '${username}'`, { profilePic }).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;