const { Router } = require("express");
const passport = require("passport");
const router = Router();
const db = require("../databases.js");
const { isAuthenticated, isProf } = require("../middleware.js");
const { comparePwd, encrypt } = require("../utils.js");

router.get("/", isAuthenticated, (req, res) => {
    return res.send({ username: req.user.username, isProf: req.user.isProf, idPromo: req.user.id_promo }).status(200);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    return res.send({ username: req.user.username, isProf: req.user.isProf }).status(200);
});

router.get('/logout', isAuthenticated, (req, res) => {
    req.logout();
    db.promise().execute(`DELETE FROM sessions WHERE session_id = '${req.sessionID}'`).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/addnewprof', isAuthenticated, isProf, (req, res) => {
    if (req.user.username !== "root") return res.sendStatus(405);
    const { username, password } = req.body;
    db.promise().execute(`INSERT INTO authentification VALUES('${username}', '${encrypt(password, username)}', 1, NULL, NULL)`).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

/** REFACTOR ICI L'USERNAME NE SERT A RIEN ONT A L'ID AUTH DANS REQ */
router.post('/:username/changepwd', isAuthenticated, (req, res) => {
    const { username } = req.params;
    const { oldPassword, newPassword } = req.body.passwords;
    if (comparePwd(oldPassword, req.user.password, username)) {
        db.promise().execute(`UPDATE authentification SET password = '${encrypt(newPassword, username)}' WHERE username = '${username}'`).then(() => {
            return res.sendStatus(200);
        }).catch(() => {
            return res.sendStatus(500);
        });
    } else {
        return res.sendStatus(401);
    }
});

/** REFACTOR ICI L'USERNAME NE SERT A RIEN ONT A L'ID AUTH DANS REQ */
router.get('/:username/profilepic', isAuthenticated, (req, res) => {
    const { username } = req.params;
    db.promise().execute(`SELECT profilepic FROM authentification WHERE username = '${username}'`).then(([rows]) => {
        if (rows[0].profilepic == null) return res.sendStatus(404);
        return res.send(rows[0]).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

/** REFACTOR ICI L'USERNAME NE SERT A RIEN ONT A L'ID AUTH DANS REQ */
router.post('/:username/profilepic/new', isAuthenticated, (req, res) => {
    const { username } = req.params;
    const profilePic = req.files.profilePic.data;
    db.promise().query(`UPDATE authentification SET ? WHERE username = '${username}'`, { profilePic }).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get("/profilepic/remove", isAuthenticated, (req, res) => {
    const { id_auth } = req.user;
    db.promise().execute(`UPDATE authentification SET profilepic = NULL WHERE id_auth = ${id_auth}`).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
})

module.exports = router;