const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/new', isAuthenticated, isProf, async (req, res) => {
    const { nomPromo } = req.body;
    db.promise().execute(`INSERT INTO promo VALUES (null,'${nomPromo}')`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/', isAuthenticated, isProf, async (_, res) => {
    db.promise().execute(`SELECT * FROM promo`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idPromo', isAuthenticated, isProf, async (req, res) => {
    const { idPromo } = req.params;
    db.promise().execute(`SELECT * FROM etudiant WHERE id_promo=${idPromo}`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;
