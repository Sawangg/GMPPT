const { Router } = require("express");
const db = require("../databases.js");
const router = Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/formules', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

module.exports = router;