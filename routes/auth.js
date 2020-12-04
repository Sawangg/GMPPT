const { Router } = require("express");
const passport = require("passport");
const router = Router();

router.get("/", (req, res) => {
    if(req.user) {
        res.send(req.user);
    } else {
        res.status(401).send({ msg: "Unauthorized" });
    }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

router.get('/logout', (req, res) => {
    res.cookie("connection.sid", "" , { expires: new Date() });
    res.redirect("/");
});

module.exports = router;