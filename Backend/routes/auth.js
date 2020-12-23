const { Router } = require("express");
const passport = require("passport");
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
    res.cookie("connection.sid", "" , { expires: new Date() });
    db.promise().execute(`DELETE FROM sessions WHERE session_id = '${req.sessionID}'`);
    return res.sendStatus(200);
});

router.post('/:username/changepwd', isAuthenticated, async (req, res) => {
    const { username } = req.params;
    await db.promise().execute(`UPDATE authentification SET password = '${req.body.newPassword}' WHERE username = '${username}'`);
    return res.sendStatus(200);
});

router.get('/:username/profilepic', isAuthenticated, async (req, res) => {
    const { username } = req.params;
    await db.promise().execute(`SELECT profilepic FROM authentification WHERE username = '${username}'`).then(async ([rows]) => {
        if(!rows[0]) return res.sendStatus(404);
        return res.send(rows[0]).status(200);
    });
});

router.post('/:username/profilepic/new', isAuthenticated, async (req, res) => {
    const { username } = req.params;
     const { profilePic } = req.body;
    const insert = {
        profilePic
    };
    await db.promise().query(`UPDATE authentification SET ? WHERE username = '${username}'`, insert)
        .catch(err => {
            return res.sendStatus(500);
        });
    return res.sendStatus(200);
});

// router.post('/signin', (req, res) => {
//     const { username, password } = req.params;
// });

module.exports = router;