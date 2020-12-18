const { Router } = require("express");
const passport = require("passport");
const router = Router();
const db = require("../databases.js");
const { isAuthenticated } = require("../middleware.js");

router.get("/", isAuthenticated, (req, res) => {
    return res.send(req.user);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    return res.sendStatus(200);
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.cookie("connection.sid", "" , { expires: new Date() });
    db.promise().execute(`DELETE FROM sessions WHERE session_id = '${req.sessionID}'`);
    return res.redirect("/");
});

router.post('/changepwd/:username', isAuthenticated, async (req, res) => {
    const { username } = req.params;
    console.log(req);
    await db.promise().execute(`UPDATE authentification SET password = ${req.body.password} WHERE username = ${username}`)
    return res.sendStatus(200);
});

// router.post('/signin', (req, res) => {
//     const { username, password } = req.params;
// });

module.exports = router;