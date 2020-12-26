const { Router } = require("express");
const db = require("../databases.js");
const router = Router();
const { isAuthenticated, isProf } = require("../middleware.js");

router.post('/:idmodele/categories/new', isAuthenticated, isProf, async (req, res) => {
    const { idmodele } = req.params;
    await db.promise().execute(`DELETE FROM categoriesTest WHERE id_modele=${idmodele}`);
    req.body.forEach(async categorie => {
        await db.promise().execute(`INSERT INTO categoriesTest VALUES (${categorie.index}, '${categorie.nom}', ${categorie.margeErreur}, ${idmodele})`);
        categorie.tabFormule.forEach(async formule => {
            await db.promise().execute(`INSERT INTO formulesTest VALUES (${formule.index}, '${formule.nomFormule}', '${formule.formule}', ${categorie.index}, ${idmodele})`);
        });
    });
    return res.sendStatus(200);
});

router.get('/:idmodele/categories/', isAuthenticated, isProf, (req, res) => {
    const { idmodele } = req.params;
    let arr = [];
    db.promise().execute(`SELECT * FROM categoriesTest C JOIN formulesTest F ON C.categoIdx = F.categoIdx WHERE C.id_modele = ${idmodele} ORDER BY C.categoIdx`).then(async ([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        let compt = -1;
        rows.forEach(r => {
            if (r.categoIdx != compt) {
                compt = r.categoIdx;
                arr.push({
                    "idx": r.categoIdx,
                    "nom": r.nomCatego,
                    "margeErreur": r.margeErreur,
                    "formules": [],
                });
            }
            arr[compt].formules.push({
                "idx": r.idx,
                "nom": r.nomFormule,
                "contenu": r.contenu,
            });
        });
        return res.send(arr).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idmodele', isAuthenticated, isProf, (req, res) => {
    const { idmodele } = req.params;
    db.promise().execute(`SELECT * FROM modeleSujetTest WHERE id_modele=${idmodele}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/', isAuthenticated, isProf, (req, res) => {
    db.promise().execute(`SELECT * FROM modeleSujetTest`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/new', isAuthenticated, isProf, (req, res) => {
    const { nommodele } = req.body;
    db.promise().execute(`INSERT INTO modeleSujetTest(nom_modele) VALUES ('${nommodele}')`).then(([rows]) => {
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.get('/:idmodele/delete', isAuthenticated, isProf, async (req, res) => {
    const { idmodele } = req.params;
    await db.promise().execute(`DELETE FROM categoriesTest WHERE id_modele=${idmodele}`);
    await db.promise().execute(`DELETE FROM modeleSujetTest WHERE id_modele=${idmodele}`);
    return res.sendStatus(200);
});

router.get('/:idmodele/variables/', isAuthenticated, isProf, async (req, res) => {
    const { idmodele } = req.params;
    db.promise().execute(`SELECT * FROM variable_aleatoire WHERE id_modele=${idmodele}`).then(([rows]) => {
        if (!rows[0]) return res.sendStatus(404);
        return res.send(rows).status(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

router.post('/:idmodele/variables/new', isAuthenticated, isProf, (req, res) => {
    const { idmodele } = req.params;
    const { nom, min, max, precision } = req.body;
    db.promise().execute(`INSERT INTO variable_aleatoire(id_modele, nom, min, max, precision) VALUES ('${idmodele}', '${nom}', ${min}, ${max}, ${precision})`).then(() => {
        return res.sendStatus(200);
    }).catch(() => {
        return res.sendStatus(500);
    });
});

module.exports = router;