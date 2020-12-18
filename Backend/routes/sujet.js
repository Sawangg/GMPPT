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

router.get('/categories', isAuthenticated, isProf, async (req, res) => {
    let arr = [];
    await db.promise().execute(`SELECT * FROM categoriesTest C JOIN formulesTest F ON C.categoIdx = F.categoIdx ORDER BY C.categoIdx`).then(async ([rows]) => {
        if(!rows[0]) return res.sendStatus(404);
        let compt = -1;
        rows.forEach(r => {
            if(r.categoIdx != compt) {
                compt = r.categoIdx;
                arr.push({
                    "idx" : r.categoIdx,
                    "nom" : r.nomCatego,
                    "margeErreur" : r.margeErreur,
                    "formules" : [],
                });
            }
            arr[compt].formules.push({
                "idx" : r.idx,
                "nom" : r.nomFormule,
                "contenu" : r.contenu,
            });
        });
    });
    return res.send(arr).status(200);
});

router.post('/modeles/new', isAuthenticated, isProf, async (req, res) => {

});

router.get('/modeles/:id', isAuthenticated, isProf, async (req, res) => {

});

module.exports = router;