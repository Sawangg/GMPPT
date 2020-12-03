const { Router } = require("express");
const db = require("../databases.js");
const router = Router();

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.get('/:id', (req, res) => {
    if(req.user) {
        const { id } = req.params;
        db.promise().execute(`SELECT * FROM etudiantTest WHERE id = ${id}`).then(([rows]) => {
            if(!rows[0]) return res.sendStatus(404);
            res.send({
                msg: rows[0].nom,
            }).status(200);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;