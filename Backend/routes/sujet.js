const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/formules', isAuthenticated, isProf, (req, res) => {
    // A optimiser
    db.promise().execute("DELETE FROM formulesTest");
    db.promise().execute("DELETE FROM categoriesTest");
    req.body.forEach(categorie => {
        db.promise().execute(`INSERT INTO categoriesTest VALUES (${categorie.index}, '${categorie.nom}', ${categorie.margeErreur})`);
        categorie.tabFormule.forEach(formule => {
            db.promise().execute(`INSERT INTO formulesTest VALUES (${formule.index}, '${formule.nomFormule}', '${formule.formule}', ${categorie.index})`);
        });
    });
    res.sendStatus(200);
});

router.get('/categories', isAuthenticated, isProf, (req, res) => {
    db.promise().execute(`SELECT * FROM categoriesTest`).then(([rows]) => {
        if(!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    });
});

router.get('/categories/:id/formules', isAuthenticated, isProf, (req, res) => {
    const { id } = req.params;
    db.promise().execute(`SELECT * FROM formulesTest WHERE categoIdx = '${id}'`).then(([rows]) => {
        if(!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    });
});

module.exports = router;