const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/new', isAuthenticated, isProf, async (req, res) => {
    const { nomPromo } = req.body;
    db.promise().execute(`INSERT INTO promo VALUES (NULL,'${nomPromo}')`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/', isAuthenticated, isProf, async (_req, res) => {
    db.promise().execute(`SELECT * FROM promo`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idpromo', isAuthenticated, isProf, async (req, res) => {
    const { idPromo } = req.params;
    db.promise().execute(`SELECT * FROM etudiant WHERE id_promo=${idPromo}`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idpromo/delete', isAuthenticated, isProf, async (req, res) => {
    const { idPromo } = req.params;
    db.promise().execute(`DELETE FROM promo WHERE id_promo=${idPromo}`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;
