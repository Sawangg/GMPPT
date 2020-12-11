const { Router } = require("express");
const db = require("../databases.js");
const router = Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});
