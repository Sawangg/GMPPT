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
    await db.promise().execute(`SELECT * FROM categoriesTest`).then(async ([rows]) => {
        if(!rows[0]) return res.sendStatus(404);
        arr = rows;
    });
    for(let i = 0; i < arr.length; ++i) {
        await db.promise().execute(`SELECT * FROM formulesTest WHERE categoIdx = '${arr[i].idx}'`).then(([formules]) => {
            arr[i].fomules = formules;
        });
    }
    return res.send(arr).status(200);
});

module.exports = router;