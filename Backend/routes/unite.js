const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/new', isAuthenticated, isProf, async (req, res) => {
    const { nom, abrev } = req.body;
    db.promise().execute(`INSERT INTO unite VALUES ('${nom}', '${abrev}')`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/', isAuthenticated, isProf, async (_req, res) => {
    db.promise().execute(`SELECT * FROM unite`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:nom/delete', isAuthenticated, isProf, async (req, res) => {
    const { nom } = req.params;
    db.promise().execute(`DELETE FROM unite WHERE nom = ${nom}`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;