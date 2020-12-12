const { Router } = require("express");
const passport = require("passport");
const router = Router();
const { isAuthenticated } = require("../middleware.js");

router.get("/", isAuthenticated, (req, res) => {
    res.send(req.user);
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

router.get('/logout', isAuthenticated, (req, res) => {
    res.cookie("connection.sid", "" , { expires: new Date() });
    res.redirect("/");
});

// router.post('/signin', (req, res) => {
//     const { username, password } = req.params;
// });

module.exports = router;